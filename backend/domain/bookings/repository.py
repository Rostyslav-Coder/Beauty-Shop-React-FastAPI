"""
backend/domain/bookings/repository.py

This module includes all database requests for the bookings interaction.
"""

from datetime import datetime, timedelta
from typing import Any

from sqlalchemy import select

from backend.domain.bookings import Booking, BookingUncommited
from backend.infrastructure.database import BaseRepository, BookingTable

__all__ = ("BookingRepository",)


class BookingRepository(BaseRepository[BookingTable]):
    schema_class = BookingTable

    async def all(self) -> list[Booking]:
        instance: BookingTable = await self._all()
        return [Booking.from_orm(booking) for booking in instance]

    #! Validated functions
    async def all_by_employee(
        self, employee_id: int, date: datetime
    ) -> list[Booking]:
        query = select(self.schema_class).where(
            getattr(self.schema_class, "employee_id") == employee_id,
            getattr(self.schema_class, "start_time") >= date,
            getattr(self.schema_class, "end_time") <= date + timedelta(days=1),
        )
        instance: BookingTable = await self.execute(query)
        _instance = instance.scalars().all()
        return [Booking.from_orm(booking) for booking in _instance]

    async def all_by_user(self, user_id: int) -> list[Booking]:
        query = select(self.schema_class).where(
            getattr(self.schema_class, "owner_id") == user_id,
        )
        instance: BookingTable = await self.execute(query)
        _instance = instance.scalars().all()
        return [Booking.from_orm(booking) for booking in _instance]

    async def get(self, id_: int) -> Booking:
        instance: BookingTable = await self._get(key="id", value=id_)
        return Booking.from_orm(instance)

    #! Validated functions
    async def create(self, schema: BookingUncommited) -> Booking:
        instance: BookingTable = await self._save(schema.dict())
        return Booking.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: BookingUncommited
    ) -> Booking:
        instance: BookingTable = await self._update(
            key=key_, value=value_, payload=payload_.dict()
        )
        return Booking.from_orm(instance)
