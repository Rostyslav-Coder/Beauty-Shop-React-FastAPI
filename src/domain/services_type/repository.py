"""src/domain/services_type/repository.py"""

from typing import Any, AsyncGenerator

from sqlalchemy import Result, select

from src.domain.services_type import ServiceType, ServiceTypeUncommited
from src.infrastructure.database import BaseRepository, ServiceTypeTable

__all__ = ("ServiceTypeRepository",)


class ServiceTypeRepository(BaseRepository[ServiceTypeTable]):
    schema_class = ServiceTypeTable

    async def all(self) -> AsyncGenerator[ServiceType, None]:
        async for instance in self._all():
            yield ServiceType.from_orm(instance)

    async def all_bu_profession(
        self, profession
    ) -> AsyncGenerator[ServiceType, None]:
        result: Result = await self.execute(
            select(self.schema_class).where(
                self.schema_class.profession == profession
            )
        )
        schemas = result.scalars().all()

        for schema in schemas:
            yield schema

    async def get(self, key_: int, value_: Any) -> ServiceType:
        instance = await self._get(key=key_, value=value_)
        return ServiceType.from_orm(instance)

    async def create(self, schema: ServiceTypeUncommited) -> ServiceType:
        instance: ServiceTypeTable = await self._save(**schema.dict())
        return ServiceType.from_orm(instance)

    async def update(
        self,
        key_: str,
        value_: Any,
        payload_: dict[str, Any],
    ) -> ServiceType:
        instance: ServiceTypeTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return ServiceType.from_orm(instance)
