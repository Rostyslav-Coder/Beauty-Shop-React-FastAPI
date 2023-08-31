"""src/users/schemas.py"""

from datetime import datetime
from typing import Optional
from uuid import UUID

from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import ConfigDict, EmailStr, validator


class UserRead(BaseUser[UUID]):
    """Pydantic User Out schema"""

    id: UUID
    email: str
    phone_number: str
    first_name: Optional[str]
    last_name: Optional[str]
    created_date: datetime

    __config__ = ConfigDict(from_attributes=True)


class UserCreate(BaseUserCreate):
    """Pydantic User In schema"""

    email: EmailStr
    phone_number: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

    @validator("password")
    def validate_password(cls, password):  # pylint: disable=E0213
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(_.isupper() for _ in password):
            raise ValueError(
                "Password must contain at least one uppercase letter"
            )
        if not any(_.islower() for _ in password):
            raise ValueError(
                "Password must contain at least one lowercase letter"
            )
        if not any(_.isdigit() for _ in password):
            raise ValueError("Password must contain at least one digit")
        return password


class UserUpdate(BaseUserUpdate):
    """Pydantic User In schema"""

    email: EmailStr
    phone_number: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserInside(BaseUser[UUID]):
    """Pydantic User Inside schema"""

    id: UUID
    email: str
    phone_number: str
    hashed_password: str
    first_name: str
    last_name: str
    is_active: bool
    is_verified: bool
    is_employee: bool
    is_superuser: bool
    created_date: datetime

    __config__ = ConfigDict(from_attributes=True)
