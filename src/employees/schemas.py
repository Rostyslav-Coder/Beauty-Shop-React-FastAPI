"""src/employees/schemas.py"""

from uuid import UUID

from pydantic import BaseModel, ConfigDict

from src.employees.constants import EmploymentContract, Profession


class EmployeeRead(BaseModel):
    """Pydantic Employee Out schema"""

    profession: Profession
    photo_url: str
    images_urls: list[str]
    employment_contract: EmploymentContract

    __config__ = ConfigDict(from_attributes=True)


class EmployeeCreate(EmployeeRead):
    """Pydantic Employee In schema"""

    user_id: UUID
