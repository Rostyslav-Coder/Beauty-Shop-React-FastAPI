"""src/employees/models.py"""

from datetime import timedelta
from decimal import Decimal
from uuid import uuid4

from sqlalchemy import (
    ARRAY,
    Enum,
    ForeignKey,
    Interval,
    LargeBinary,
    Numeric,
    String,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

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
    employee_photo: Mapped[bytes] = mapped_column(LargeBinary, nullable=True)
    title: Mapped[str] = mapped_column(String(length=500), nullable=False)
    instagram: Mapped[str] = mapped_column(String, nullable=True)
    facebook: Mapped[str] = mapped_column(String, nullable=True)
    images_urls: Mapped[list[str]] = mapped_column(
        ARRAY(String), nullable=True
    )
    employment_contract: Mapped[EmploymentContract] = mapped_column(
        Enum(EmploymentContract), nullable=False
    )
    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id")
    )
    services = relationship("Service", back_populates="employee")


class Service(Base):
    """Class for creating a Service table in the Database"""

    __tablename__ = "services"

    service_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    service_name: Mapped[str] = mapped_column(
        String(length=50), nullable=False
    )
    service_duration: Mapped[timedelta] = mapped_column(
        Interval, nullable=False
    )
    service_cost: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False
    )
    employee_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("employees.employee_id")
    )

    employee = relationship("Employee", back_populates="services")
