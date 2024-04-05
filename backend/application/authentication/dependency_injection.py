"""backend/application/authentication/dependency_injection.py"""

from datetime import datetime, timedelta

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import ValidationError

from backend.config import settings
from backend.domain.authentication import TokenPayload
from backend.domain.constants import UserRole
from backend.domain.users import User, UsersRepository
from backend.infrastructure.errors import (
    AuthenticationError,
    AuthorizationError,
)

__all__ = (
    "create_access_token",
    "create_refresh_token",
    "get_current_user",
    "RoleRequired",
)

oauth2_oauth = OAuth2PasswordBearer(
    tokenUrl="/auth/token",
    scheme_name=settings.authentication.scheme,
)


def decode_jwt(token: str) -> dict:
    """Function to decode JWT and return payload"""

    try:
        payload = jwt.decode(
            token,
            settings.authentication.access_token.secret_key,
            algorithms=[settings.authentication.algorithm],
        )
        token_payload = TokenPayload(**payload)

        if datetime.fromtimestamp(token_payload.exp) < datetime.now():
            raise AuthenticationError
    except (JWTError, ValidationError):
        raise AuthenticationError

    return token_payload


def encod_jwt(to_encode) -> str:
    """Function to encode JWT"""

    expire = datetime.utcnow() + timedelta(
        seconds=settings.authentication.refresh_token.ttl
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.authentication.access_token.secret_key,
        algorithm=settings.authentication.algorithm,
    )

    return encoded_jwt


def create_access_token(data: dict) -> str:
    """function create & return access token"""

    to_encode = data.copy()

    encoded_jwt = encod_jwt(to_encode)

    return encoded_jwt


def create_refresh_token(data: dict) -> str:
    """function create & return refresh token"""

    to_encode = data.copy()

    encoded_jwt = encod_jwt(to_encode)

    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_oauth)) -> User:
    """Get current user from user token"""

    token_payload = decode_jwt(token)

    user: User = await UsersRepository().get(
        key_="id", value_=token_payload.sub
    )

    # TODO: Check if the token is in the blacklist

    return user


# TODO: Create token blacklist & Logout f-tion


class RoleRequired:
    """Require users role"""

    def __init__(self, role: UserRole):
        self.role = role

    async def __call__(self, user: User = Depends(get_current_user)):
        enum_role = UserRole(self.role)

        if user.role != enum_role.value:
            raise AuthorizationError
        return user
