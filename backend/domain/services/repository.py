"""backend/domain/services/repository.py"""

from typing import Any, AsyncGenerator

from sqlalchemy import Result, select
from sqlalchemy.orm import joinedload

from backend.domain.services import (
    Service,
    ServiceUncommited,
    ServiceUnexpanded,
)
from backend.infrastructure.database import BaseRepository, ServiceTable
from backend.infrastructure.errors import NotFoundError

__all__ = ("ServiceRepository",)


class ServiceRepository(BaseRepository[ServiceTable]):
    schema_class = ServiceTable

    async def all(self) -> AsyncGenerator[Service, None]:
        async for instance in self._all():
            yield Service.from_orm(instance)

    async def get(self, key_: int, value_: Any) -> Service:
        query = (
            select(self.schema_class)
            .options(joinedload(ServiceTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError
        service = Service.from_orm(_result)
        return service

    async def create(self, schema: ServiceUncommited) -> Service:
        instance: ServiceTable = await self._save(schema.dict())
        service = ServiceUnexpanded.from_orm(instance)
        return service

    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> Service:
        instance: ServiceTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return Service.from_orm(instance)
