"""
backend/presentation/rest/users.py

This module contains all user routes.
"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import get_current_user
from backend.application.registration import registration_observer
from backend.config import pwd_context
from backend.domain.users import (
    User,
    UserCreateRequestBody,
    UserPublic,
    UsersRepository,
    UserUncommited,
)
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/users", tags=["Route for managing users"])


#! Validated endpoint
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
    schema = registration_observer(schema)

    # Create a new user in the database
    user: User = await UsersRepository().create(
        UserUncommited(**schema.dict())
    )
    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)


#! Validated endpoint
@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def users_all(
    _: Request,
    user: User = Depends(get_current_user),
) -> ResponseMulti[UserPublic]:
    """Get All Users"""

    # Only admin or employee can get all users
    if user.role != "ADMIN" and user.role != "EMPLOYEE":
        raise AuthenticationError

    # Get users list from database
    users: list[User] = await UsersRepository().all()
    users_public = [UserPublic.from_orm(user) for user in users]

    return ResponseMulti[UserPublic](result=users_public)
