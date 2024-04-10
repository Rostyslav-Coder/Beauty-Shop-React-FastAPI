"""backend/domain/employees/repository.py"""

from typing import Any, AsyncGenerator

from backend.domain.professions import Profession, ProfessionUncommited
from backend.infrastructure.database import BaseRepository, ProfessionTable

__all__ = ("ProfessionRepository",)


class ProfessionRepository(BaseRepository[ProfessionTable]):
    schema_class = ProfessionTable

    async def all(self) -> AsyncGenerator[Profession, None]:
        async for instance in self._all():
            yield Profession.from_orm(instance)

    async def get(self, key_: str, value_: Any) -> Profession:
        instance = await self._get(key=key_, value=value_)
        return Profession.from_orm(instance)

    async def create(self, schema: ProfessionUncommited) -> Profession:
        instance: ProfessionTable = await self._save(schema.dict())
        return Profession.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: ProfessionUncommited
    ) -> Profession:
        instance: ProfessionTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return Profession.from_orm(instance)
