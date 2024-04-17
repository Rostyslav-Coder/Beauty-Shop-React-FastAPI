"""
backend/application/employee/working_shift.py

This module includes functions for the employee interaction.
"""

from datetime import datetime, time, timedelta

from backend.domain.bookings import Booking
from backend.domain.constants import WorkingDays, WorkingShift
from backend.domain.employees import Employee

__all__ = ("get_employee_shedule", "schedule_observer")


#! Validated function
def get_next_working_day(
    working_day_type: WorkingDays, start_date: datetime
) -> datetime:
    """
    Returns the next working day based on the type of working days and the start date.
    """

    # Calculate the next working day based on the type of working days
    next_working_day: datetime

    if working_day_type == WorkingDays.EVEN_DAYS.value:
        # If the date is even, then the next working day will be the next even day
        next_working_day = start_date + timedelta(
            days=1 if start_date.day % 2 == 0 else 2
        )
    elif working_day_type == WorkingDays.ODD_DAYS.value:
        # If the date is odd, then the next working day will be the next odd day
        next_working_day = start_date + timedelta(
            days=1 if start_date.day % 2 != 0 else 2
        )
    elif working_day_type == WorkingDays.WEEK_DAYS.value:
        # If the date is a weekday, then the next working day will be the next weekday
        if start_date.weekday() >= 4:  # 0 = Monday, 6 = Sunday
            next_working_day = start_date + timedelta(
                days=(7 - start_date.weekday()) + 1
            )
        else:
            next_working_day = start_date + timedelta(days=1)

    return next_working_day


#! Validated function
def get_shift_time(shift: WorkingShift) -> tuple[time, time]:
    """
    Returns a tuple representing the start and end time of an employee's shift.
    """

    # Define shift times
    shift_times = (
        time(hour=0, minute=0, second=0),
        time(hour=0, minute=0, second=0),
    )

    if shift == "MORNING_SHIFT":
        shift_times = (
            time(hour=10, minute=0, second=0),
            time(hour=16, minute=0, second=0),
        )  # from 10:00 to 16:00
    elif shift == "AFTERNOON_SHIFT":
        shift_times = (
            time(hour=16, minute=0, second=0),
            time(hour=22, minute=0, second=0),
        )  # from 16:00 to 22:00

    return shift_times


#! Validated function
def generate_schedule(shift_start: datetime, shift_end: datetime) -> list:
    """
    Generate a schedule for a given shift.
    """

    # Initialize an empty list to store the schedule
    schedule: list = []

    # Initialize the current time variable with the start of the shift
    current_time = shift_start

    # Loop through the week and add the times to the schedule list
    while current_time <= shift_end:
        # Add the current time to the schedule
        schedule.append(current_time)

        # Move to the next time slot
        current_time += timedelta(minutes=30)

    return schedule


#! Validated function
def get_employee_shedule(employee: Employee) -> list:
    """
    Returns a list of datetimes representing the schedule of an Employee for the
    current day.
    """

    # Get the next working day
    if not employee.working_days:
        raise ValueError("Employee working days are not defined")

    next_working_day: datetime = get_next_working_day(
        employee.working_days, datetime.now()
    )

    # Get the start and end time of the employee's shift
    shift_start_time, shift_end_time = get_shift_time(employee.working_shift)

    # Combine the next working day with the start time to get the start of
    # the shift
    shift_start = datetime.combine(next_working_day, shift_start_time)

    # Combine the next working day with the end time to get the end of
    # the shift
    shift_end = datetime.combine(next_working_day, shift_end_time)

    # Initialize an empty list to store the schedule
    schedule = generate_schedule(shift_start, shift_end)

    return schedule


#! Validated function
def filter_schedule(
    new_schedule: list,
    bookings: list[Booking],
    end_of_working_day: datetime,
) -> list:
    """
    Filters the new_schedule by removing the times that fall within the booking ranges.
    """

    # Loop through each booking
    for booking in bookings:
        booking_start = booking.start_time
        booking_end = booking.end_time

        # Filter the schedule to remove the times that fall within the booking range
        new_schedule = [
            current_time
            for current_time in new_schedule
            if not (booking_start <= current_time < booking_end)
            and current_time <= end_of_working_day
        ]

    return new_schedule


#! Validated function
def duration_check(new_schedule: list, offer_duration: timedelta) -> list:
    """
    Checks if each consecutive time slot in new_schedule is within the
    offer_duration. If not, adds the current slot to the final_schedule and
    starts a new one. Returns the final_schedule.
    """

    # List to store the final schedule
    final_schedule = []

    # List to store the current slot
    current_slot: list[list[datetime]] = []

    # Variable to store the duration of the current slot
    current_duration = timedelta(minutes=0)

    # Loop through the new_schedule
    for i in range(len(new_schedule)):

        # If the current slot is empty, add the current time to it.
        if not current_slot:
            current_slot.append(new_schedule[i])
            current_duration += timedelta(minutes=30)

        # If the current time is 30 minutes after the last time in the
        # current slot, add it to the current slot.
        elif new_schedule[i] - current_slot[-1] == timedelta(minutes=30):
            current_slot.append(new_schedule[i])
            current_duration += timedelta(minutes=30)

        # If the current time is more than 30 minutes after the last time in
        # the current slot, check if the current slot is longer than the
        # offer_duration.
        else:
            # If the current slot duration is greater or equal to the
            # offer_duration, add it to the final_schedule.
            if current_duration >= offer_duration:
                final_schedule.extend(current_slot)

            # Start a new slot with the current time.
            current_slot = [new_schedule[i]]

            # Reset the current slot duration.
            current_duration = timedelta(minutes=30)

    # Check the last slot.
    if current_slot and current_duration >= offer_duration:
        final_schedule.extend(current_slot)

    return final_schedule


#! Validated function
def schedule_observer(
    schedule: list,
    bookings: list[Booking],
    offer_duration: timedelta,
) -> list:
    """
    Removes the times that are booked by a list of bookings from a schedule.
    """

    # Create a copy of the schedule to avoid modifying the original
    new_schedule = schedule.copy()

    # Calculate the end of the working day
    end_of_working_day = new_schedule[-1] - offer_duration

    # Remove the times that are booked from the schedule
    new_schedule = filter_schedule(new_schedule, bookings, end_of_working_day)

    # Check if the remaining time slots are longer than the offer_duration
    final_schedule = duration_check(new_schedule, offer_duration)

    return final_schedule
