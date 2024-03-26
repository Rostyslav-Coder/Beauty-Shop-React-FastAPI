"""backend/domain/services/repository.py"""

from typing import Any, AsyncGenerator

from backend.domain.services import Service, ServiceUncommited
from backend.infrastructure.database import BaseRepository, ServiceTable

__all__ = ("ServiceRepository",)


class ServiceRepository(BaseRepository[ServiceTable]):
    schema_class = ServiceTable

    async def all(self) -> AsyncGenerator[Service, None]:
        async for instance in self._all():
            yield Service.from_orm(instance)

    async def get(self, key_: int, value_: Any) -> Service:
        instance = await self._get(key=key_, value=value_)
        return Service.from_orm(instance)

    async def create(self, schema: ServiceUncommited) -> Service:
        instance: ServiceTable = await self._save(schema.dict())
        return Service.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> Service:
        instance: ServiceTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return Service.from_orm(instance)
