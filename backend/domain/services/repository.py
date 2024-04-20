"""
backend/domain/services/repository.py

This module includes all database requests for the services interaction.
"""

from typing import Any

from sqlalchemy import Result, select
from sqlalchemy.orm import joinedload

from backend.domain.services import (
    Service,
    ServiceUncommited,
    ServiceWithProfessionPublic,
)
from backend.infrastructure.database import BaseRepository, ServiceTable
from backend.infrastructure.errors import NotFoundError

__all__ = ("ServiceRepository",)


class ServiceRepository(BaseRepository[ServiceTable]):
    schema_class = ServiceTable

    #! Validated function
    async def all(self) -> list[Service]:
        instance: ServiceTable = await self._all()
        return [Service.from_orm(service) for service in instance]

    async def all_by_profesion(
        self, profession_id_: int, skip_: int, limit_: int
    ) -> list[Service]:
        query = (
            select(self.schema_class)
            .where(
                getattr(self.schema_class, "profession_id") == profession_id_
            )
            .offset(skip_)
            .limit(limit_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().all()):
            raise NotFoundError
        return [Service.from_orm(service) for service in _result]

    #! Validated function
    async def get(self, key_: str, value_: Any) -> ServiceWithProfessionPublic:
        query = (
            select(self.schema_class)
            .options(joinedload(ServiceTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError
        return ServiceWithProfessionPublic.from_orm(_result)

    #! Validated function
    async def create(self, schema: ServiceUncommited) -> Service:
        instance: ServiceTable = await self._save(schema.dict())
        return Service.from_orm(instance)

    #! Validated function
    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> Service:
        instance: ServiceTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        stmt = select(self.schema_class).where(
            getattr(self.schema_class, key_) == value_
        )
        result = await self._session.execute(stmt)
        instance = result.scalars().first()
        return Service.from_orm(instance)
