"""
backend/domain/employees/models.py

This module includes all models for the employees interaction.
"""

from pydantic import Field

from backend.domain.constants import WorkingDays, WorkingShift
from backend.domain.professions import ProfessionName
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "EmployeeCreateRequestBody",
    "EmployeePublic",
    "EmployeeWithProfessionPublic",
    "EmployeeUncommited",
    "Employee",
    "EmployeeWithProfession",
)


# Public models
# ============================================================
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
    is_active: bool = Field(description="Is Active")


class EmployeeWithProfessionPublic(EmployeePublicBase):
    """
    Existed employee representation.
    """

    id: int
    profession: ProfessionName
    is_active: bool


# Internal models
# ============================================================
class EmployeeUncommited(InternalModel):
    """
    This schema is used for creating instance in the database.
    """

    user_id: int
    profession_id: int
    working_days: WorkingDays
    working_shift: WorkingShift


class Employee(EmployeeUncommited):
    """
    The internal application representation.
    """

    id: int
    is_active: bool


class EmployeeWithProfession(EmployeeUncommited):
    """
    Fool internal application representation.
    """

    id: int
    is_active: bool
    profession: ProfessionName
