"""backend/domain/services_type/models.py"""

from pydantic import Field

# from backend.domain.constants import Profession
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "ServiceTypeCreateRequestBody",
    "ServiceTypePublic",
    "ServiceTypeUncommited",
    "ServiceType",
)


# Public models
# ------------------------------------------------------
class ServiceTypeCreateRequestBody(PublicModel):
    """Service type create request body."""

    profession_id: int = Field(description="OpenAPI description")
    service_type: str = Field(description="OpenAPI description")


class ServiceTypePublic(ServiceTypeCreateRequestBody):
    """The public representation of the service type."""

    id: int


# Internal models
# ------------------------------------------------------
class ServiceTypeUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    profession_id: int
    service_type: str


class ServiceType(ServiceTypeUncommited):
    """Existed service type representation."""

    id: int
