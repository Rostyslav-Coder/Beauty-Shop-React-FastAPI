"""src/domain/employees/models.py"""

from pydantic import Field

from src.domain.constants import Profession, WorkingDays, WorkingShift
from src.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "EmployeeCreateRequestBody",
    "EmployeePublic",
    "EmployeeUncommited",
    "Employee",
)


# Public models
# ------------------------------------------------------
class EmployeeCreateRequestBody(PublicModel):
    """Employee create request body."""

    user_id: int = Field(description="OpenAPI description")
    profession: Profession = Field(description="OpenAPI description")
    working_days: WorkingDays = Field(description="OpenAPI description")
    working_shift: WorkingShift = Field(description="OpenAPI description")


class EmployeePublic(PublicModel):
    """The internal application representation."""

    user_id: int
    profession: Profession
    working_days: WorkingDays
    working_shift: WorkingShift


# Internal models
# ------------------------------------------------------
class EmployeeUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    user_id: int
    profession: Profession
    working_days: WorkingDays
    working_shift: WorkingShift


class Employee(EmployeeUncommited):
    """Existed product representation."""

    pass
