"""
backend/presentation/rest/bookings.py

This module contains all booking routes.
"""

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import get_current_user
from backend.application.booking import booking_schema_updater
from backend.application.employee import (
    get_employee_shedule,
    schedule_observer,
)
from backend.domain.bookings import (
    Booking,
    BookingCreateRequestBody,
    BookingPublic,
    BookingRepository,
    BookingUncommited,
)
from backend.domain.employees import Employee, EmployeeRepository
from backend.domain.offers import OfferPublic
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/bookings", tags=["Route for managing bookings"])


#! Validated endpoint
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def booking_create(
    _: Request,
    schema: BookingCreateRequestBody,
    user: User = Depends(get_current_user),
) -> Response[BookingPublic]:
    """Create new booking."""

    # Checking Permissions Authentication
    if user.role != "USER":
        raise AuthenticationError

    schema_uncommited: BookingUncommited = await booking_schema_updater(schema)

    # Create new booking in the database
    booking: Booking = await BookingRepository().create(
        BookingUncommited(**schema_uncommited.dict())
    )
    booking_public = BookingPublic.from_orm(booking)

    return Response[BookingPublic](result=booking_public)


#! Validated endpoint
@router.get("/free_slots", status_code=status.HTTP_200_OK)
@transaction
async def free_slots_by_employee_and_date(
    _: Request,
    date: str,
    offer: OfferPublic,
) -> ResponseMulti[datetime]:
    """
    Get the employee's free slots for a given date.
    """

    # Get the offer duration
    offer_duration = timedelta(minutes=offer.duration)

    # Get the employee
    employee_id = offer.employee_id
    employe: Employee = await EmployeeRepository().get(
        key_="id", value_=employee_id
    )

    # Get the employee's schedule
    schedule = get_employee_shedule(employee=employe)

    # Get the bookings for the given date
    bookings: list[Booking] = await BookingRepository().all_by_employee(
        employee_id=employee_id, date=datetime.fromisoformat(date)
    )

    # Remove the booked times from the schedule
    new_schedule = schedule_observer(schedule, bookings, offer_duration)

    return ResponseMulti[datetime](result=new_schedule)


#! Validated endpoint
@router.get("/all_my", status_code=status.HTTP_200_OK)
@transaction
async def bookings_all_my(
    _: Request,
    user: User = Depends(get_current_user),
) -> ResponseMulti[BookingPublic]:
    """Get All My Bookings"""

    # Only user can get all his bookings
    if user.role != "USER":
        raise AuthenticationError

    # Get bookings list from database
    bookings: list[Booking] = await BookingRepository().all_by_user(
        user_id=user.id
    )

    # Convert bookings to public list
    bookings_public = [BookingPublic.from_orm(booking) for booking in bookings]

    return ResponseMulti[BookingPublic](result=bookings_public)
