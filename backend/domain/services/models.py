"""backend/domain/services/models.py"""

from datetime import timedelta
from decimal import Decimal
from typing import Optional

from pydantic import Field

from backend.domain.professions import ProfessonService
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "ServiceCreateRequestBody",
    "ServicePublic",
    "ServiceUncommited",
    "ServiceUnexpanded",
    "Service",
)


# Public models
# ------------------------------------------------------
class ServicePublicBase(PublicModel):
    """
    Base class for public employee schemas. Defines common fields
    that are present in all public Service schemas.
    """

    name: str = Field(description="Service name")
    description: str = Field(description="Service description")


class ServiceCreateRequestBody(ServicePublicBase):
    """Service create request body."""

    duration: Optional[timedelta] = Field(description="Service duration")
    min_price: Decimal = Field(description="Service minimal price")
    price: Optional[Decimal] = Field(description="Service price")
    profession_id: int = Field(description="Associated profession ID")


class ServicePublic(ServicePublicBase):
    """The public representation of the service."""

    id: int
    duration: timedelta
    price: Decimal
    profession_id: int
    profession: ProfessonService


# Internal models
# ------------------------------------------------------
class ServiceUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    name: str
    description: str
    duration: Optional[timedelta]
    price: Optional[Decimal]
    min_price: Decimal
    profession_id: int


class ServiceUnexpanded(InternalModel):
    """Representation without related tables"""

    id: int
    name: str
    description: str
    min_price: Decimal
    profession_id: int


class Service(ServiceUncommited):
    """Existed service representation."""

    id: int
    profession: ProfessonService
