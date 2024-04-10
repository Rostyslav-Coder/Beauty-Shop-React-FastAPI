"""backend/domain/offers/models.py"""

from decimal import Decimal

from pydantic import Field

from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "OfferCreateRequestBody",
    "OfferPublic",
    "OfferUncommited",
    "Offer",
)


# Public models
# ------------------------------------------------------
class OfferPublicBase(PublicModel):
    """
    Base class for public offer schemas. Defines common fields
    that are present in all public offer schemas.
    """

    price: Decimal = Field(description="Offer price")
    duration: int = Field(description="Offer duration in minutes")
    service_id: int = Field(description="Associated service ID")
    employee_id: int = Field(description="Associated employee ID")


class OfferCreateRequestBody(OfferPublicBase):
    """Request body to create offer."""

    pass


class OfferPublic(OfferPublicBase):
    """Existed profession representation."""

    id: int = Field(description="Offer ID")


# Internal models
# ------------------------------------------------------
class OfferUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    price: Decimal
    duration: int
    service_id: int
    employee_id: int


class Offer(OfferUncommited):
    """The internal application representation."""

    id: int
