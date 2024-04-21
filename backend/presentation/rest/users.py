"""
backend/presentation/rest/users.py

This module contains all user routes.
"""

from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse

from backend.application.authentication import (
    create_auth_response,
    get_current_user,
)
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
from backend.infrastructure.errors.base import NotFoundError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/users", tags=["Route for managing users"])


#! Validated endpoint
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def user_create(
    _: Request,
    schema: UserCreateRequestBody,
) -> JSONResponse:
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
    # user_public = UserPublic.from_orm(user)

    response: JSONResponse = create_auth_response(user)

    return response


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


#! Validated endpoint
@router.get("/info", status_code=status.HTTP_200_OK)
@transaction
async def user_info(
    _: Request, user_email: str, user_: User = Depends(get_current_user)
) -> Response[UserPublic]:
    """Get User Info"""

    # Only admin or employee can get all users
    if user_.role != "ADMIN" and user_.role != "EMPLOYEE":
        raise AuthenticationError

    # Get the associated user from the database
    user: User = await UsersRepository().get(key_="email", value_=user_email)

    if not user:
        raise NotFoundError

    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)
