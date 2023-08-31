"""src/employees/schemas.py"""

from datetime import timedelta
from decimal import Decimal
from typing import Optional
from uuid import UUID

from pydantic import AnyUrl, BaseModel, ConfigDict, Field

from src.employees.constants import EmploymentContract, Profession


class EmployeeOut(BaseModel):
    """Pydantic Employee Out schema"""

    employee_id: UUID
    profession: Profession
    employee_photo: Optional[AnyUrl]
    title: str
    instagram: Optional[AnyUrl]
    facebook: Optional[AnyUrl]
    images_urls: list[AnyUrl]
    employment_contract: EmploymentContract

    __config__ = ConfigDict(from_attributes=True)


class EmployeeIn(BaseModel):
    """Pydantic Employee In schema"""

    profession: Profession
    employee_photo: Optional[AnyUrl]
    title: str
    instagram: Optional[AnyUrl]
    facebook: Optional[AnyUrl]
    images_urls: Optional[list[AnyUrl]]
    employment_contract: EmploymentContract


class ServiceRead(BaseModel):
    """Pydantic Service Out schema"""

    service_id: UUID
    service_name: str
    service_duration: timedelta
    service_cost: Decimal

    __config__ = ConfigDict(from_attributes=True)


class ServiceCreate(ServiceRead):
    """Pydantic Service Out schema"""

    employee_id: UUID
