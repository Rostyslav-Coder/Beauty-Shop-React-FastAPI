"""src/domain/constants/booking.py"""

from enum import Enum

__all__ = ("BookingStatus",)


class BookingStatus(Enum):
    ACTIVE = "Active"
    COMPLETED = "Completed"
    CANCELED = "Canceled"
