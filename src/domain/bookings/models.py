"""src/domain/bookings/models.py"""

from datetime import timedelta

from pydantic import Field

from src.domain.constants import BookingStatus
from src.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "BookingCreateRequestBody",
    "BookingPublic",
    "BookingUncommited",
    "Booking",
)


# Public models
# ------------------------------------------------------
class BookingCreateRequestBody(PublicModel):
    """Booking create request body."""

    user_id: int = Field(description="OpenAPI description")
    employee_id: int = Field(description="OpenAPI description")
    service_id: int = Field(description="OpenAPI description")
    start_time: timedelta = Field(description="OpenAPI description")
    end_time: timedelta = Field(description="OpenAPI description")
    status: BookingStatus = Field(description="OpenAPI description")


class BookingPublic(PublicModel):
    """The internal application representation."""

    user_id: int
    employee_id: int
    service_id: int
    start_time: timedelta
    end_time: timedelta
    status: BookingStatus


# Internal models
# ------------------------------------------------------
class BookingUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    user_id: int
    employee_id: int
    service_id: int
    start_time: timedelta
    end_time: timedelta
    status: BookingStatus


class Booking(BookingUncommited):
    """Existed product representation."""

    pass
