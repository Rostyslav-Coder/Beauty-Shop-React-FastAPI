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

    profession: str = Field(description="Profession Name")
    description: Optional[str] = Field(description="Profession Description")


class ProfessionCreateRequestBody(ProfessionPublicBase):
    """
    Request body to create Profession.
    """

    pass


class ProfessionPublic(ProfessionPublicBase):
    """
    Existed profession representation.
    """

    id: int = Field(description="Profession ID")


# Internal models
# ------------------------------------------------------
class ProfessionUncommited(InternalModel):
    """
    This schema is used for creating instance in the database.
    """

    profession: str
    description: Optional[str]


class Profession(ProfessionUncommited):
    """
    The internal application representation.
    """

    id: int
