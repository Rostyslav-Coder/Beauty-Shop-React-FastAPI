"""backend/domain/employees/models.py"""

from pydantic import Field

from backend.domain.constants import WorkingDays, WorkingShift
from backend.domain.professions import Profession, ProfessionPublic
from backend.domain.users import User, UserPublic
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "EmployeeCreateRequestBody",
    "EmployeePublic",
    "EmployeeUncommited",
    "EmployeeUnexpanded",
    "Employee",
)


# Public models
# ------------------------------------------------------
class EmployeePublicBase(PublicModel):
    """
    Base class for public employee schemas. Defines common fields
    that are present in all public employee schemas.
    """

    user_id: int = Field(description="User")
    profession_id: int = Field(description="Profession")
    working_days: WorkingDays = Field(description="Working Days")
    working_shift: WorkingShift = Field(description="Working Shift")


class EmployeeCreateRequestBody(EmployeePublicBase):
    """
    Request body to create Employee.
    """

    pass


class EmployeePublic(EmployeePublicBase):
    """
    Existed employee representation.
    """

    id: int = Field(description="Employee ID")
    user: UserPublic
    profession: ProfessionPublic
    is_active: bool = Field(description="Is Active")


# Internal models
# ------------------------------------------------------
class EmployeeUncommited(InternalModel):
    """
    This schema is used for creating instance in the database.
    """

    user_id: int
    profession_id: int
    working_days: WorkingDays
    working_shift: WorkingShift


class EmployeeUnexpanded(EmployeeUncommited):
    """
    Representation without related tables
    """

    id: int
    is_active: bool


class Employee(EmployeeUncommited):
    """
    The internal application representation.
    """

    id: int
    is_active: bool
    user: User
    profession: Profession
