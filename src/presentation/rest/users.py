"""src/presentation/rest/users.py"""

from fastapi import APIRouter, Depends, Request, status

from src.application.authentication import get_current_user
from src.config import ADMIN_KEY, EMPLOYEES_KEY, pwd_context
from src.domain.constants import UserRole
from src.domain.users import (
    User,
    UserCreateRequestBody,
    UserPublic,
    UsersRepository,
    UserUncommited,
)
from src.infrastructure.database import transaction
from src.infrastructure.errors import AuthorizationError
from src.infrastructure.models import Response  # ResponseMulti

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def user_create(
    _: Request,
    schema: UserCreateRequestBody,
) -> Response[UserPublic]:
    """Create new user."""

    # Password hashing
    hashed_password = pwd_context.hash(schema.password)
    schema.password = hashed_password

    # Save new user to the database
    user: User = await UsersRepository().create(
        UserUncommited(**schema.dict())
    )
    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)


@router.get("/me", status_code=status.HTTP_200_OK)
@transaction
async def user_me(
    _: Request,
    current_user: User = Depends(get_current_user),
) -> Response[UserPublic]:
    """Get current aythenticate user by JWT token"""

    # Get user by JWT from database
    user: User = await UsersRepository().get(key_="id", value_=current_user.id)
    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)


@router.put("/employee", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def user_employee(
    _: Request,
    employee_key: str,
    user: UserPublic = Depends(get_current_user),
) -> Response[UserPublic]:
    """Update users role to employee"""

    # Check employee secret key
    print(user)
    print(employee_key)
    print(EMPLOYEES_KEY)
    if employee_key != str(EMPLOYEES_KEY):
        raise AuthorizationError

    # Update user to employee
    user.role = UserRole.EMPLOYEE
    # payload = {"role": "Employee"}
    user: User = await UsersRepository().update(
        key_="id", value_=user.id, payload_=user.dict()
    )
    employee = UserPublic.from_orm(user)

    return Response[UserPublic](result=employee)


@router.put("/admin", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def user_admin(
    _: Request,
    admin_key: str,
    user: UserPublic = Depends(get_current_user),
) -> Response[UserPublic]:
    """Update users role to admin"""

    # Check admin secret key
    if admin_key != ADMIN_KEY:
        raise AuthorizationError

    # Update user to admin
    user.role = UserRole.ADMIN
    user: User = await UsersRepository().update(
        key_="id", value_=user.id, payload_=user
    )
    admin = UserPublic.from_orm(user)

    return Response[UserPublic](result=admin)
