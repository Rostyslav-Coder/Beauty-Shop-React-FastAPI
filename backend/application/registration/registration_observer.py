"""
backend/application/registration/registration_observer.py

This module includes functions for the registration interaction.
"""

from backend.config import ADMIN_KEY
from backend.domain.constants import UserRole
from backend.domain.users import UserCreateRequestBody


#! Validated function
def registration_observer(
    schema: UserCreateRequestBody,
) -> UserCreateRequestBody:
    """
    Apply observer logic to user creation request schema.
    If last_name contains admin key, replace it and set role to admin.
    """

    if schema.last_name and f"/{ADMIN_KEY}/" in schema.last_name:
        schema.last_name = schema.last_name.replace(f"/{ADMIN_KEY}/", "")
        schema.role = UserRole.ADMIN

    return schema
