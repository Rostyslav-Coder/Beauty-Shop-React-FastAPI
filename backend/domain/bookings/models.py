"""
backend/domain/bookings/models.py

This module includes all models for the bookings interaction.
"""

from datetime import datetime

from pydantic import Field

from backend.domain.constants import BookingStatus
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "BookingCreateRequestBody",
    "BookingPublic",
    "BookingUncommited",
    "Booking",
)


# Public models
# ============================================================
class BookingPublicBase(PublicModel):

    owner_id: int = Field(description="User ID")
    offer_id: int = Field(description="Associated offer ID")


class BookingCreateRequestBody(BookingPublicBase):
    """Booking create request body."""

    start_time: str = Field(
        description="Booking start time in STRING ISO 8601 format"
    )


class BookingPublic(BookingPublicBase):
    """The internal application representation."""

    id: int = Field(description="Booking ID")
    employee_id: int = Field(description="Associated employee ID")
    start_time: datetime = Field(description="Booking start time in UTC")
    end_time: datetime = Field(description="Booking end time in UTC")
    status: BookingStatus = Field(description="Booking status")


# Internal models
# ============================================================
class BookingUncommited(InternalModel):
    """This schema is used for creating instance in the database."""

    owner_id: int
    offer_id: int
    employee_id: int
    start_time: datetime
    end_time: datetime


class Booking(BookingUncommited):
    """Existed product representation."""

    id: int
    status: BookingStatus
