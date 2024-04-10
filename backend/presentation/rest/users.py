"""backend/presentation/rest/users.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired, get_current_user
from backend.application.registration import registrationObserver
from backend.config import pwd_context
from backend.domain.constants import UserRole
from backend.domain.users import (
    User,
    UserCreateRequestBody,
    UserPublic,
    UsersRepository,
    UserUncommited,
)
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response

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

    # Role definition
    schema = registrationObserver(schema)

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
    user: User = Depends(get_current_user),
) -> Response[UserPublic]:
    """Get current aythenticate user by JWT token"""

    # Get user by JWT from ORM
    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)


@router.get("/get_by_email", status_code=status.HTTP_200_OK)
@transaction
async def get_user_by_email(
    _: Request, user_email: str, user_=Depends(RoleRequired(UserRole.ADMIN))
) -> Response[UserPublic]:
    """Obtaining user data for registration as an employee"""

    found_user: User = await UsersRepository().get(
        key_="email", value_=user_email
    )
    user_public = UserPublic.from_orm(found_user)

    return Response[UserPublic](result=user_public)
