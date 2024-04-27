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
from backend.domain.offers import Offer, OfferRepository
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

    schema_uncommited: BookingUncommited = await booking_schema_updater(
        schema, user
    )

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
    offer_id: int,
) -> ResponseMulti[datetime]:
    """
    Get the employee's free slots for a given date.
    """

    # Get the date
    date = datetime.now()

    # Get the offer from the database
    offer: Offer = await OfferRepository().get(key_="id", value_=offer_id)

    # Get the offer duration
    offer_duration = timedelta(minutes=offer.duration)

    # Get the employee
    employe: Employee = await EmployeeRepository().get(
        key_="id", value_=offer.employee_id
    )

    # Get the employee's schedule
    schedule = get_employee_shedule(employee=employe)

    # Get the bookings for the given date
    bookings: list[Booking] = await BookingRepository().all_by_employee(
        employee_id=offer.employee_id, date=date
    )

    # Remove the booked times from the schedule
    new_schedule = schedule_observer(schedule, bookings, offer_duration)

    return ResponseMulti[datetime](result=new_schedule)


# ^ Almost validated endpoint(no bookings in DB yet)
@router.get("/to_given_day", status_code=status.HTTP_200_OK)
@transaction
async def bookings_to_given_day(
    _: Request,
    employee_id: int,
    date: datetime,
    user: User = Depends(get_current_user),
) -> ResponseMulti[BookingPublic]:
    """Get bookings from today to a given day"""

    # Only employee can get his bookings from today
    if user.role != "EMPLOYEE":
        raise AuthenticationError

    # Get next day bookings
    bookings: list[Booking] = await BookingRepository().all_by_date(
        employee_id=employee_id, date=date
    )
    bookings_public = [BookingPublic.from_orm(booking) for booking in bookings]

    return ResponseMulti[BookingPublic](result=bookings_public)


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
    bookings_public = [BookingPublic.from_orm(booking) for booking in bookings]

    return ResponseMulti[BookingPublic](result=bookings_public)
