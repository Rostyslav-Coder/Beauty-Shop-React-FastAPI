"""src/domain/services/models.py"""

from datetime import timedelta
from decimal import Decimal

from pydantic import Field

from src.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "ServiceCreateRequestBody",
    "ServicePublic",
    "ServiceUncommited",
    "Service",
)


# Public models
# ------------------------------------------------------
class ServiceCreateRequestBody(PublicModel):
    """Service create request body."""

    name: str = Field(description="OpenAPI description")
    title: str = Field(description="OpenAPI description")
    duration: timedelta = Field(description="OpenAPI description")
    price: Decimal = Field(description="OpenAPI description")
    employee_id: int = Field(description="OpenAPI description")


class ServicePublic(PublicModel):
    """The public representation of the service."""

    id: int
    name: str
    title: str
    duration: timedelta
    price: Decimal
    employee_id: int


# Internal models
# ------------------------------------------------------
class ServiceUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    name: str
    title: str
    duration: timedelta
    price: Decimal


class Service(ServiceUncommited):
    """Existed service representation."""

    id: int
    employee_id: int
