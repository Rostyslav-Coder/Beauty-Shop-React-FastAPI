"""backend/presentation/rest/authentication.py"""

from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm

from backend.application.authentication import (
    create_access_token,
    create_refresh_token,
    get_current_user,
)
from backend.config import settings
from backend.domain.users import User, UsersRepository
from backend.infrastructure.errors import AuthenticationError, NotFoundError

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/token", status_code=status.HTTP_200_OK)
async def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    """Authenticate user"""

    # Get user from the database by email in place of username
    username = form_data.username
    user: User = await UsersRepository().get(key_="email", value_=username)

    if not user:
        raise NotFoundError

    # Creating user token
    access_token = create_access_token(data={"sub": str(user.id)})

    # Creating refresh token
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    # Create a new response object
    # and set the refresh token as a secure HTTP-only cookie
    response = JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "access_token": access_token,
            "token_type": settings.authentication.scheme,
        },
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="none",
    )

    return response


@router.post("/refresh", status_code=status.HTTP_200_OK)
async def refresh_token(request: Request = Depends()):
    """Refresh the access token"""

    # Get the refresh token from the cookies
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise AuthenticationError

    # Decode the refresh token and get user associated with him
    user: User = get_current_user(refresh_token)

    if not user:
        raise NotFoundError

    # Create new access token
    access_token = create_access_token(data={"sub": str(user.id)})

    return {
        "access_token": access_token,
        "token_type": settings.authentication.scheme,
    }
