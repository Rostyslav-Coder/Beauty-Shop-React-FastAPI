"""src/employees/constants.py"""

from enum import Enum


class Profession(Enum):
    """Class of professions of the salon employees"""

    HAIR_STYLIST = "Hair stylist"
    MAKEUP_ARTIST = "Makeup artist"
    ESTHETICIAN = "Esthetician"
    NAIL_TECHNICIAN = "Nail technician"
    EYELASH_SPECIALIST = "Eyelash specialist"
    MASSAGE_THERAPIST = "Massage therapist"
    TATTOO_ARTIST = "Tattoo artist"
    TANNING_CONSULTANT = "Tanning consultant"
    BEAUTY_CONSULTANT = "Beauty consultant"
    SALON_MANAGER = "Salon manager"


class EmploymentContract(Enum):
    """Class of employment contract types"""

    CONTRACT = "Working contract"
    RENT = "Rent contract"
