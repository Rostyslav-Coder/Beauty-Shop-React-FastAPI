"""backend/domain/users/models.py"""

from typing import Optional

from pydantic import Field

from backend.domain.constants import UserRole
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = ("UserCreateRequestBody", "UserPublic", "UserUncommited", "User")


# Public models
# ------------------------------------------------------
class UserPublicBase(PublicModel):
    """
    Base class for public user schemas. Defines common fields
    that are present in all public user schemas.
    """

    email: str = Field(description="User Email")
    phone_number: str = Field(description="User Phone Number")
    first_name: Optional[str] = Field(description="User First Name")
    last_name: Optional[str] = Field(description="User Last Name")


class UserCreateRequestBody(UserPublicBase):
    """
    Request body to create User.
    """

    password: str = Field(description="User Password")
    role: Optional[UserRole] = Field(description="User Role")


class UserPublic(UserPublicBase):
    """
    Existed user representation.
    """

    id: int = Field(description="User ID")
    role: UserRole


# Internal models
# ------------------------------------------------------
class UserUncommited(InternalModel):
    """
    This schema is used for creating instance in the database.
    Эта схема используется для создания экземпляра в базе данных.
    """

    email: str
    phone_number: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]
    role: Optional[UserRole]


class User(UserUncommited):
    """
    The internal application representation.
    Внутреннее представление приложения.
    """

    id: int
