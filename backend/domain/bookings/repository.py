"""backend/domain/bookings/repository.py"""

from typing import Any, AsyncGenerator

from backend.domain.bookings import Booking, BookingUncommited
from backend.infrastructure.database import BaseRepository, BookingTable

__all__ = ("BookingRepository",)


class BookingRepository(BaseRepository[BookingTable]):
    schema_class = BookingTable

    async def all(self) -> AsyncGenerator[Booking, None]:
        async for instance in self._all():
            yield Booking.from_orm(instance)

    async def get(self, id_: int) -> Booking:
        instance = await self._get(key="id", value=id_)
        return Booking.from_orm(instance)

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
