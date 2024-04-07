"""backend/domain/professions/models.py"""

from typing import Optional

from pydantic import Field

from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "ProfessionCreateRequestBody",
    "ProfessionPublic",
    "ProfessionUncommited",
    "Profession",
)


# Public models
# ------------------------------------------------------
class ProfessionPublicBase(PublicModel):
    """
    Base class for public profession schemas. Defines common fields
    that are present in all public profession schemas.
    """

    name: str = Field(description="Profession Name")


class ProfessionCreateRequestBody(ProfessionPublicBase):
    """
    Request body to create Profession.
    """

    description: Optional[str] = Field(description="Profession Description")


class ProfessionPublic(ProfessionPublicBase):
    """
    Existed profession representation.
    """

    id: int = Field(description="Profession ID")
    description: Optional[str]


class ProfessionEmployee(ProfessionPublicBase):
    """
    Model that complements the employee model
    """

    id: int


# Internal models
# ------------------------------------------------------
class ProfessionUncommited(InternalModel):
    """
    This schema is used for creating instance in the database.
    """

    name: str
    description: Optional[str]


class Profession(ProfessionUncommited):
    """
    The internal application representation.
    """

    id: int
