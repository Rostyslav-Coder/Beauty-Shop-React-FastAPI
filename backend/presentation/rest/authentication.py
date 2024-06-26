"""backend/presentation/rest/authentication.py"""

from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm

from backend.application.authentication import (
    create_auth_response,
    get_current_user,
)
from backend.domain.users import User, UsersRepository
from backend.infrastructure.errors import AuthenticationError, NotFoundError

router = APIRouter(prefix="/auth", tags=["Authentication"])


#! Validated endpoint
@router.post("/token", status_code=status.HTTP_200_OK)
async def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> JSONResponse:
    """Authenticate user"""

    # Get user from the database by email in place of username
    username = form_data.username
    user: User = await UsersRepository().get(key_="email", value_=username)

    if not user:
        raise NotFoundError

    # Create authentication response
    response: JSONResponse = create_auth_response(user)

    return response


@router.post("/refresh", status_code=status.HTTP_200_OK)
async def refresh_token(request: Request = Depends()) -> JSONResponse:
    """Refresh the access token"""

    # Get the refresh token from the cookies
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise AuthenticationError

    # Decode the refresh token and get user associated with him
    user: User = get_current_user(refresh_token)

    if not user:
        raise NotFoundError

    response: JSONResponse = create_auth_response(user)

    return response
