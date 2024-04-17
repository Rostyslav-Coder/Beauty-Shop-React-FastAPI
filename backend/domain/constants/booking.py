"""
backend/domain/constants/booking.py

This module includes all enumerated models for the bookings interaction.
"""

from enum import Enum

__all__ = ("BookingStatus",)


class BookingStatus(Enum):
    ACTIVE = "Active"
    COMPLETED = "Completed"
    CANCELED = "Canceled"
