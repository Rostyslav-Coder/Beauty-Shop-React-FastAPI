"""src/application/authentication/dependency_injection.py"""

from datetime import datetime

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import ValidationError

from src.config import settings
from src.domain.authentication import TokenPayload
from src.domain.constants import UserRole
from src.domain.users import User, UsersRepository
from src.infrastructure.errors import AuthenticationError, AuthorizationError

__all__ = (
    "get_current_user",
    "RoleRequired",
)

oauth2_oauth = OAuth2PasswordBearer(
    tokenUrl="/auth/openapi",
    scheme_name=settings.authentication.scheme,
)


async def get_current_user(token: str = Depends(oauth2_oauth)) -> User:
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

    user = await UsersRepository().get(key_="id", value_=token_payload.sub)

    # TODO: Check if the token is in the blacklist

    return user


# TODO: Create token blacklist & Logout f-tion


class RoleRequired:
    """Require users role"""

    def __init__(self, role: UserRole):
        self.role = role

    async def __call__(self, user: User = Depends(get_current_user)):
        if user.role != self.role:
            raise AuthorizationError

        return user
