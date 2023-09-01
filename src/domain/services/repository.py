"""src/domain/services/repository.py"""

from typing import Any, AsyncGenerator

from src.domain.services import Service, ServiceUncommited
from src.infrastructure.database import BaseRepository, ServiceTable

__all__ = ("SericeRepository",)


class SericeRepository(BaseRepository[ServiceTable]):
    schema_class = ServiceTable

    async def all(self) -> AsyncGenerator[Service, None]:
        async for instance in self._all():
            yield Service.from_orm(instance)

    async def get(self, id_: int) -> Service:
        instance = await self._get(key="id", value=id_)
        return Service.from_orm(instance)

    async def create(self, schema: ServiceUncommited) -> Service:
        instance: ServiceTable = await self._save(schema.dict())
        return Service.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: ServiceUncommited
    ) -> Service:
        instance: ServiceTable = await self._update(
            key=key_, value=value_, payload=payload_.dict()
        )
        return Service.from_orm(instance)
