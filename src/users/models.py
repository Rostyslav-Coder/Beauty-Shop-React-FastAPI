"""src/users/models.py"""

from datetime import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import TIMESTAMP, UUID, Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class User(SQLAlchemyBaseUserTableUUID, Base):
    """Class for creating a User table in the Database"""

    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    email: Mapped[str] = mapped_column(
        String(length=320), unique=True, index=True, nullable=False
    )
    phone_number: Mapped[str] = mapped_column(
        String(length=13), unique=True, index=True, nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(length=1024), nullable=False
    )
    first_name: Mapped[str] = mapped_column(String(length=100), nullable=True)
    last_name: Mapped[str] = mapped_column(String(length=100), nullable=True)
    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    is_employee: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    is_superuser: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    created_date: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP, default=datetime.utcnow
    )
