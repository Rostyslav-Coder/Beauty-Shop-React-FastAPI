"""src/employees/schemas.py"""

from uuid import UUID

from pydantic import AnyUrl, BaseModel, ConfigDict, Field

from src.employees.constants import EmploymentContract, Profession


class EmployeeRead(BaseModel):
    """Pydantic Employee Out schema"""

    profession: Profession
    employee_photo: bytes = Field(
        None, title="Employee Photo", description="Employee Photo"
    )
    title: str
    instagram: AnyUrl
    facebook: AnyUrl
    images_urls: list[AnyUrl]
    employment_contract: EmploymentContract

    __config__ = ConfigDict(from_attributes=True)


class EmployeeCreate(EmployeeRead):
    """Pydantic Employee In schema"""

    user_id: UUID
