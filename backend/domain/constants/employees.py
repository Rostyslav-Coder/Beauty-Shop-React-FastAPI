"""
backend/domain/constants/employees.py

This module includes all enumerated models for the employees interaction.
"""

from enum import Enum

__all__ = (
    "WorkingDays",
    "WorkingShift",
)


class WorkingDays(Enum):
    EVEN_DAYS = "EVEN_DAYS"
    ODD_DAYS = "ODD_DAYS"
    WEEK_DAYS = "WEEK_DAYS"


class WorkingShift(Enum):
    MORNING_SHIFT = "MORNING_SHIFT"
    AFTERNOON_SHIFT = "AFTERNOON_SHIFT"
