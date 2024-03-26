"""backend/domain/services/models.py"""

from datetime import timedelta
from decimal import Decimal
from typing import Any

from pydantic import Field, validator

from backend.domain.constants import Profession
from backend.domain.services_type import (
    ServiceTypePublic,
    ServiceTypeRepository,
)
from backend.infrastructure.models import InternalModel, PublicModel

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
    profession: Profession = Field(description="OpenAPI description")
    service_type: str = Field(description="OpenAPI description")

    @classmethod
    @validator("service_type")
    def validate_service_type(cls, value: str, values: dict[str, Any]) -> str:
        profession = values.get("profession")
        service_type_names: list[str] = []
        if profession is not None:
            service_type = ServiceTypeRepository().all_bu_profession(
                profession=profession
            )
            service_types = ServiceTypePublic.from_orm(service_type)
            service_type_names.append(service_types.service_type)
            if value not in service_type_names:
                raise ValueError(
                    f"Invalid Service Type for {profession}: {value}"
                )
        return value


class ServicePublic(ServiceCreateRequestBody):
    """The public representation of the service."""

    id: int


# Internal models
# ------------------------------------------------------
class ServiceUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    name: str
    title: str
    duration: timedelta
    price: Decimal
    employee_id: int
    service_type: str


class Service(ServiceUncommited):
    """Existed service representation."""

    id: int
