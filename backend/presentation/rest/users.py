"""backend/presentation/rest/users.py"""

# Code updated

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired, get_current_user
from backend.application.registration import registrationObserver
from backend.config import pwd_context
from backend.domain.constants import UserRole
from backend.domain.users import (
    User,
    UserCreateRequestBody,
    UserEmployeePublic,
    UserPublic,
    UsersRepository,
    UserUncommited,
)
from backend.domain.users.models import UserEmployee
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError, NotFoundError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def user_create(
    _: Request,
    schema: UserCreateRequestBody,
) -> Response[UserPublic]:
    """Create a new user."""

    # Hash the password
    hashed_password = pwd_context.hash(schema.password)
    schema.password = hashed_password

    # Modify the request body based on the role of the user
    schema = registrationObserver(schema)

    # Create a new user in the database
    user: User = await UsersRepository().create(
        UserUncommited(**schema.dict())
    )

    # Convert the user object to a public representation
    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)


@router.get("/me", status_code=status.HTTP_200_OK)
@transaction
async def user_me(
    _: Request,
    user: User = Depends(get_current_user),
) -> Response[UserPublic]:
    """Get current authenticated user by JWT token."""

    # Check if the user is authenticated
    if user is None:
        raise AuthenticationError

    # Convert the user object from the ORM to the domain model
    user = User.from_orm(user)

    # Determine the public representation of the user based on their role
    if user.role == UserRole.EMPLOYEE:
        # Create a public representation of the user as an employee
        user_public = UserEmployeePublic.from_orm(user)
    else:
        # Create a public representation of the user as a regular user
        user_public = UserPublic.from_orm(user)

    # Return the public representation of the user
    return Response[UserPublic](result=user_public)


@router.get("/by_email", status_code=status.HTTP_200_OK)
@transaction
async def user_by_email(
    _: Request, user_email: str, user_=Depends(RoleRequired(UserRole.ADMIN))
) -> Response[UserPublic]:
    """Get user data by email."""

    # Get user by email from database
    user: User = await UsersRepository().get(key_="email", value_=user_email)

    if not user:
        raise NotFoundError

    # Determine the public representation of the user based on their role
    if user.role == UserRole.EMPLOYEE:
        # Get employee by email from database
        user_employee: UserEmployee = UsersRepository().get_user_employee(
            key_="email", value_=user_email
        )
        # Create a public representation of the user as an employee
        user_public = UserEmployeePublic.from_orm(user_employee)
    else:
        # Create the public representation of the user
        user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def users_all(
    _: Request, skip: int, limit: int
) -> ResponseMulti[UserPublic]:
    """Get all current users"""

    # Get users list from database
    users: User = UsersRepository().all(skip_=skip, limit_=limit)
    users_public: list[UserPublic] = [user async for user in users]

    return ResponseMulti[UserPublic](result=users_public)


@router.get("/all_users_employee", status_code=status.HTTP_200_OK)
@transaction
async def users_employee_all(
    __: Request, skip: int, limit: int
) -> ResponseMulti[UserEmployeePublic]:
    """Get all current users-employees"""

    # Get users list from database
    users: UserEmployee = UsersRepository().all_users_employee(
        skip_=skip, limit_=limit
    )
    users_public = [UserEmployeePublic.from_orm(user) for user in await users]

    return ResponseMulti[UserEmployeePublic](result=users_public)
