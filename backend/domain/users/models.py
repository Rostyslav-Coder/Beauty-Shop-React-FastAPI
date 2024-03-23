"""src/domain/users/models.py"""

from typing import Optional

from pydantic import Field

from backend.domain.constants import UserRole
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = ("UserCreateRequestBody", "UserPublic", "UserUncommited", "User")


# Public models
# ------------------------------------------------------
class _UserPublic(PublicModel):
    """Base class for public user schemas. Defines common fields
    that are present in all public user schemas.
    """

    email: str = Field(description="OpenAPI description")
    phone_number: str = Field(description="OpenAPI description")
    first_name: str = Field(description="OpenAPI description")
    last_name: str = Field(description="OpenAPI description")


class UserCreateRequestBody(_UserPublic):
    """User create request body"""

    password: str


class UserPublic(_UserPublic):
    """The internal application representation."""

    id: int
    role: UserRole


# Internal models
# ------------------------------------------------------
class UserUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    email: str
    phone_number: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]


class User(UserUncommited):
    """Existed user representation."""

    id: int
    role: UserRole
