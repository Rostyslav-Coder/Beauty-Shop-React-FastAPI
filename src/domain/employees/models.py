"""src/domain/employees/models.py"""

from pydantic import Field

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
    profession: str = Field(description="OpenAPI description")
    working_days: str = Field(description="OpenAPI description")
    working_shift: str = Field(description="OpenAPI description")


class EmployeePublic(PublicModel):
    """The internal application representation."""

    user_id: int
    profession: str
    working_days: str
    working_shift: str


# Internal models
# ------------------------------------------------------
class EmployeeUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    user_id: int
    profession: str
    working_days: str
    working_shift: str


class Employee(EmployeeUncommited):
    """Existed product representation."""

    pass
