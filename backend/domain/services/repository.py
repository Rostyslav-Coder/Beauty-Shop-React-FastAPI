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

    async def all(self) -> AsyncGenerator[ServiceUnexpanded, None]:
        async for instance in self._all():
            yield ServiceUnexpanded.from_orm(instance)

    async def all_by_prfsn(
        self, profession_id_: int, skip_: int = 0, limit_: int = 10
    ) -> list[Service]:
        query = (
            select(self.schema_class)
            .options(joinedload(ServiceTable.profession))
            .where(
                getattr(self.schema_class, "profession_id") == profession_id_
            )
            .offset(skip_)
            .limit(limit_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().all()):
            raise NotFoundError
        services = [Service.from_orm(service) for service in _result]
        return services

    async def get(self, key_: str, value_: Any) -> Service:
        query = (
            select(self.schema_class)
            .options(joinedload(ServiceTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError
        return Service.from_orm(_result)

    async def create(self, schema: ServiceUncommited) -> ServiceUnexpanded:
        instance: ServiceTable = await self._save(schema.dict())
        return ServiceUnexpanded.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> Service:
        instance: ServiceTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        stmt = (
            select(self.schema_class)
            .options(joinedload(ServiceTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result = await self._session.execute(stmt)
        instance = result.scalars().first()
        return Service.from_orm(instance)
