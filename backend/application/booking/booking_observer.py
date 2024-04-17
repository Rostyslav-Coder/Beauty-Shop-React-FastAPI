"""
backend/application/booking/booking_observer.py

This module includes functions for the booking interaction.
"""

from datetime import timedelta

from dateutil import parser

from backend.domain.bookings import BookingCreateRequestBody, BookingUncommited
from backend.domain.offers import Offer, OfferRepository

__all__ = ("booking_schema_updater",)


#! Validated function
async def booking_schema_updater(
    schema: BookingCreateRequestBody,
) -> BookingUncommited:
    """
    Validates and updates the booking schema.
    """

    # Get the associated offer from the database
    offer: Offer = await OfferRepository().get(
        key_="id", value_=schema.offer_id
    )

    # Convert start_time to datetime object in UTC
    start_time_utc = parser.parse(schema.start_time)

    # Calculate end_time based on offer duration
    if offer.duration > 60:
        hours, minutes = divmod(offer.duration, 60)
        end_time_utc = start_time_utc + timedelta(hours=hours, minutes=minutes)
    else:
        end_time_utc = start_time_utc + timedelta(minutes=offer.duration)

    updated_schema = BookingUncommited(
        owner_id=schema.owner_id,
        offer_id=schema.offer_id,
        employee_id=offer.employee_id,
        start_time=start_time_utc,
        end_time=end_time_utc,
    )

    return updated_schema
