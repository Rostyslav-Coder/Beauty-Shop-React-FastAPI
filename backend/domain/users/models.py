"""backend/domain/users/models.py"""

# Code updated

from typing import Optional

from pydantic import Field

from backend.domain.constants import UserRole
from backend.domain.employees import EmployeePublic
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "UserCreateRequestBody",
    "UserPublic",
    "UserEmployeePublic",
    "UserUncommited",
    "User",
    "UserEmployee",
)


# Public models
# ============================================================
class UserPublicBase(PublicModel):
    """
    Base class for public User schemas. Defines common fields
    that are present in all public User schemas.
    """

    email: str = Field(description="User Email")
    phone_number: str = Field(description="User Phone Number")
    first_name: Optional[str] = Field(description="User First Name")
    last_name: Optional[str] = Field(description="User Last Name")


class UserCreateRequestBody(UserPublicBase):
    """Request body to create User."""

    password: str = Field(description="User Password")
    role: Optional[UserRole] = Field(description="User Role")


class UserPublic(UserPublicBase):
    """Existed User representation."""

    id: int = Field(description="User ID")
    role: UserRole


class UserEmployeePublic(UserPublic):
    """Existed User-Employee representation."""

    employee: EmployeePublic = Field(description="Employee profession")


# Internal models
# ============================================================
class UserUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    email: str
    phone_number: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]
    role: Optional[UserRole]


class User(UserUncommited):
    """The internal application representation of User."""

    id: int


class UserEmployee(User):
    """The internal application representation of User-Employee."""

    employee: EmployeePublic
