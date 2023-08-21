"""src/employees/models.py"""

from uuid import uuid4

from sqlalchemy import ARRAY, Enum, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base
from src.employees.constants import EmploymentContract, Profession


class Employee(Base):
    """Class for creating a Employee table in the Database"""

    __tablename__ = "employees"

    employee_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    profession: Mapped[Profession] = mapped_column(
        Enum(Profession), nullable=False
    )
    photo_url: Mapped[str] = mapped_column(String, nullable=True)
    images_urls: Mapped[list[str]] = mapped_column(
        ARRAY(String), nullable=True
    )
    employment_contract: Mapped[EmploymentContract] = mapped_column(
        Enum(EmploymentContract), nullable=False
    )
    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id")
    )
