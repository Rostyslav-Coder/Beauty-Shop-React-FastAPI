"""backend/domain/constants/employees.py"""

from enum import Enum

__all__ = (
    "Profession",
    "WorkingDays",
    "WorkingShift",
)


class Profession(Enum):
    HAIR_STYLIST = "HAIR STYLIST"
    MAKEUP_ARTIST = "MAKEUP ARTIST"
    ESTHETICIAN = "ESTHETICIAN"
    NAIL_TECHNICIAN = "NAIL TECHNICIAN"
    EYELESH_SPECIALIST = "EYELESH SPECIALIST"
    MASSAGE_THERAPIST = "MASSAGE THERAPIST"
    TATTOO_ARTIST = "TATTOO ARTIST"


class WorkingDays(Enum):
    EVEN_DAYS = "EVEN DAYS"
    ODD_DAYS = "ODD DAYS"
    WEEK_DAYS = "WEEK DAYS"


class WorkingShift(Enum):
    MORNING_SHIFT = "MORNING SHIFT"
    AFTERNOON_SHIFT = "AFTERNOON SHIFT"
