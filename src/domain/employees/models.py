"""src/domain/employees/models.py"""

from pydantic import Field

from src.domain.constants import Profession, WorkingDays, WorkingShift
from src.domain.users import UserPublic
from src.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "EmployeeCreateRequestBody",
    "EmployeePublic",
    "EmployeeUncommited",
    "Employee",
    "UserEmployee",
    "UserEmployeePublic",
)


# Public models
# ------------------------------------------------------
class _EmployeePublic(PublicModel):
    """
    Base class for public employee schemas. Defines common fields
    that are present in all public employee schemas.
    """

    user_id: int = Field(description="OpenAPI description")
    profession: Profession = Field(description="OpenAPI description")
    working_days: WorkingDays = Field(description="OpenAPI description")
    working_shift: WorkingShift = Field(description="OpenAPI description")


class EmployeeCreateRequestBody(_EmployeePublic):
    """Employee create request body."""

    pass


class EmployeePublic(_EmployeePublic):
    """The public representation of the employee."""

    id: int


class UserEmployeePublic(_EmployeePublic):
    """The public representation of the employee, enhanced with user data."""

    id: int
    user: UserPublic


# Internal models
# ------------------------------------------------------
class EmployeeUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    user_id: int
    profession: Profession
    working_days: WorkingDays
    working_shift: WorkingShift


class Employee(EmployeeUncommited):
    """Existed employee representation."""

    id: int


class UserEmployee(EmployeeUncommited):
    """Existed employee representation, enhanced with user data."""

    id: int
    user: UserPublic
