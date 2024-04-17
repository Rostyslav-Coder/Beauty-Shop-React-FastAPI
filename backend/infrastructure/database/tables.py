"""
backend/infrastructure/database/tables.py

This module includes all tables for the database.
"""

from typing import TypeVar

from sqlalchemy import (
    DATETIME,
    Boolean,
    Column,
    Enum,
    ForeignKey,
    Integer,
    MetaData,
    Numeric,
    String,
)
from sqlalchemy.orm import (
    Mapped,
    declarative_base,
    mapped_column,
    relationship,
)

from backend.domain.constants import (
    BookingStatus,
    UserRole,
    WorkingDays,
    WorkingShift,
)

__all__ = (
    "UserTable",
    "EmployeeTable",
    "ProfessionTable",
    "ServiceTable",
    "OfferTable",
    "BookingTable",
)

meta = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_`%(constraint_name)s`",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)


class _Base:
    """
    Base class for all database models.

    Базовый класс для всех моделей баз данных.
    """

    id = Column(Integer, primary_key=True)


Base = declarative_base(cls=_Base, metadata=meta)

ConcreteTable = TypeVar("ConcreteTable", bound=Base)  # type: ignore


class UserTable(Base):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(
        String(length=320), unique=True, nullable=False
    )
    phone_number: Mapped[str] = mapped_column(String(16), nullable=False)
    password: Mapped[str] = mapped_column(String(length=1024), nullable=False)
    first_name: Mapped[str] = mapped_column(
        String(length=100), default="NoNameUser"
    )
    last_name: Mapped[str] = mapped_column(
        String(length=100), default="NoLastName"
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    role: Mapped[Enum] = mapped_column(Enum(UserRole), default=UserRole.USER)

    employee = relationship(
        "EmployeeTable", back_populates="user", uselist=False
    )
    bookings = relationship("BookingTable", back_populates="user")


class EmployeeTable(Base):
    __tablename__ = "employees"

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=False
    )
    profession_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("professions.id"), nullable=False
    )
    working_days: Mapped[Enum] = mapped_column(
        Enum(WorkingDays), nullable=False
    )
    working_shift: Mapped[Enum] = mapped_column(
        Enum(WorkingShift), nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    user = relationship("UserTable", back_populates="employee")
    profession = relationship("ProfessionTable", back_populates="employees")
    offers = relationship("OfferTable", back_populates="employee")
    bookings = relationship("BookingTable", back_populates="employee")


class ProfessionTable(Base):
    __tablename__ = "professions"

    name: Mapped[str] = mapped_column(String(length=50), nullable=False)
    description: Mapped[str] = mapped_column(String(length=200), nullable=True)

    employees = relationship("EmployeeTable", back_populates="profession")
    services = relationship("ServiceTable", back_populates="profession")


class ServiceTable(Base):
    __tablename__ = "services"

    name: Mapped[str] = mapped_column(String(length=100), nullable=False)
    description: Mapped[str] = mapped_column(
        String(length=200), nullable=False
    )
    min_price: Mapped[Numeric] = mapped_column(Numeric(10, 2), nullable=False)
    profession_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("professions.id"), nullable=False
    )

    profession = relationship("ProfessionTable", back_populates="services")
    offers = relationship("OfferTable", back_populates="service")


class OfferTable(Base):
    __tablename__ = "offers"

    price: Mapped[Numeric] = mapped_column(Numeric, nullable=False)
    duration: Mapped[int] = mapped_column(Integer, nullable=False)
    service_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("services.id"), nullable=False
    )
    employee_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("employees.id"), nullable=False
    )

    employee = relationship("EmployeeTable", back_populates="offers")
    service = relationship("ServiceTable", back_populates="offers")
    bookings = relationship("BookingTable", back_populates="offer")


class BookingTable(Base):
    __tablename__ = "bookings"

    owner_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=False
    )
    offer_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("offers.id"), nullable=False
    )
    employee_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("employees.id"), nullable=False
    )
    start_time: Mapped[DATETIME] = mapped_column(DATETIME, nullable=False)
    end_time: Mapped[DATETIME] = mapped_column(DATETIME, nullable=False)
    status: Mapped[Enum] = mapped_column(
        Enum(BookingStatus), default=BookingStatus.ACTIVE
    )

    user = relationship("UserTable", back_populates="bookings")
    offer = relationship("OfferTable", back_populates="bookings")
    employee = relationship("EmployeeTable", back_populates="bookings")
