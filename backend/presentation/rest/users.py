"""backend/presentation/rest/users.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import get_current_user
from backend.application.registration import registrationObserver
from backend.config import pwd_context
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
