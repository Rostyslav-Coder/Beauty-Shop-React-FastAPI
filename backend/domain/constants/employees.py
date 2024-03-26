"""backend/domain/constants/employees.py"""

from enum import Enum

__all__ = (
    "Profession",
    "WorkingDays",
    "WorkingShift",
)


class Profession(Enum):
    HAIR_STYLIST = "HAIR_STYLIST"
    MAKEUP_ARTIST = "MAKEUP_ARTIST"
    ESTHETICIAN = "ESTHETICIAN"
    NAIL_TECHNICIAN = "NAIL_TECHNICIAN"
    EYELESH_SPECIALIST = "EYELESH_SPECIALIST"
    MASSAGE_THERAPIST = "MASSAGE_THERAPIST"
    TATTOO_ARTIST = "TATTOO_ARTIST"


class WorkingDays(Enum):
    EVEN_DAYS = "EVEN_DAYS"
    ODD_DAYS = "ODD_DAYS"
    WEEK_DAYS = "WEEK_DAYS"


class WorkingShift(Enum):
    MORNING_SHIFT = "MORNING_SHIFT"
    AFTERNOON_SHIFT = "AFTERNOON_SHIFT"
