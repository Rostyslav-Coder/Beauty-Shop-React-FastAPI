"""backend/domain/employees/repository.py"""

from typing import Any, AsyncGenerator

from backend.domain.professions import (
    Profession,
    ProfessionPublic,
    ProfessionUncommited,
)
from backend.infrastructure.database import BaseRepository, ProfessionTable

__all__ = ("ProfessionRepository",)


class ProfessionRepository(BaseRepository[ProfessionTable]):
    schema_class = ProfessionTable

    async def all(self) -> AsyncGenerator[ProfessionPublic, None]:
        async for instance in self._all():
            yield ProfessionPublic.from_orm(instance)

    async def get(self, key_: str, value_: Any) -> ProfessionPublic:
        instance = await self._get(key=key_, value=value_)
        return ProfessionPublic.from_orm(instance)

    async def create(self, schema: ProfessionUncommited) -> Profession:
        instance: ProfessionTable = await self._save(schema.dict())
        return Profession.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: ProfessionUncommited
    ) -> ProfessionPublic:
        instance: ProfessionTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return ProfessionPublic.from_orm(instance)
