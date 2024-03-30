"""backend/domain/employees/models.py"""

from pydantic import Field, validator

from backend.domain.constants import WorkingDays, WorkingShift
from backend.domain.users import UserPublic
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "EmployeeCreateRequestBody",
    "EmployeePublic",
    "EmployeeUncommited",
    "Employee",
)


# Public models
# ------------------------------------------------------
class _EmployeePublic(PublicModel):
    """
    Base class for public employee schemas. Defines common fields
    that are present in all public employee schemas.
    """

    user_id: int = Field(description="Linked User ID")


class EmployeeCreateRequestBody(_EmployeePublic):
    """
    Request body to create Employee.
    """

    profession_id: int = Field(description="Employee Profession ID")
    working_days: WorkingDays = Field(description="Employee Working Days")
    working_shift: WorkingShift = Field(description="Employee Working Shift")

    @validator("working_days", pre=True)
    def pars_working_days(cls, value):
        if isinstance(value, str):
            return WorkingDays(value)
        return value

    @validator("working_shift", pre=True)
    def pars_working_shift(cls, value):
        if isinstance(value, str):
            return WorkingShift(value)
        return value


class EmployeePublic(_EmployeePublic):
    """The public representation of the employee."""

    id: int
    profession_id: int
    working_days: WorkingDays
    working_shift: WorkingShift
    user: UserPublic


# Internal models
# ------------------------------------------------------
class EmployeeUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    user_id: int
    profession_id: int
    working_days: WorkingDays
    working_shift: WorkingShift


class Employee(EmployeeUncommited):
    """Existed employee representation."""

    id: int
    is_active: bool
