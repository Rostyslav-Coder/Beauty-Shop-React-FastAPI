"""
backend/domain/constants/users.py

This module includes all enumerated models for the users interaction.
"""

from enum import Enum

__all__ = ("UserRole",)


class UserRole(Enum):
    USER = "USER"
    EMPLOYEE = "EMPLOYEE"
    ADMIN = "ADMIN"
