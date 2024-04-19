"""
backend/domain/services/models.py

This module includes all models for the services interaction.
"""

from decimal import Decimal

from pydantic import Field

from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "ServiceCreateRequestBody",
    "ServicePublic",
    "ServiceUncommited",
    "Service",
)


# Public models
# ============================================================
class ServicePublicBase(PublicModel):
    """
    Base class for public employee schemas. Defines common fields
    that are present in all public Service schemas.
    """

    name: str = Field(description="Service name")
    description: str = Field(description="Service description")
    min_price: Decimal = Field(description="Service minimal price")
    profession_id: int = Field(description="Associated profession ID")


class ServiceCreateRequestBody(ServicePublicBase):
    """Service create request body."""

    pass


class ServicePublic(ServicePublicBase):
    """The public representation of the service."""

    id: int = Field(description="Service ID")


# Internal models
# ============================================================
class ServiceUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    name: str
    description: str
    min_price: Decimal
    profession_id: int


class Service(ServiceUncommited):
    """Existed service representation."""

    id: int
