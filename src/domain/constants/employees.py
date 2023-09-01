"""src/domain/constants/employees.py"""

from enum import Enum

__all__ = (
    "Profession",
    "WorkingDays",
    "WorkingShift",
)


class Profession(Enum):
    HAIR_STYLIST = "Hair stylist"
    MAKEUP_ARTIST = "Makeup artist"
    ESTHETICIAN = "Esthetician"
    NAIL_TECHNICIAN = "Nail technician"
    EYELESH_SPECIALIST = "Eyelash specialist"
    MASSAGE_THERAPIST = "Massage therapist"
    TATTOO_ARTIST = "Tattoo artist"


class WorkingDays(Enum):
    EVEN_DAYS = "Even Days"
    ODD_DAYS = "Odd Days"
    WEEK_DAYS = "Week Days"


class WorkingShift(Enum):
    MORNING_SHIFT = "Morning Shift"
    AFTERNOON_SHIFT = "Afternoon Shift"
