"""
backend/domain/employees/repository.py

This module includes all database requests for the employees interaction.
"""

from typing import Any

from backend.domain.professions import Profession, ProfessionUncommited
from backend.infrastructure.database import BaseRepository, ProfessionTable

__all__ = ("ProfessionRepository",)


class ProfessionRepository(BaseRepository[ProfessionTable]):
    schema_class = ProfessionTable

    #! Validated function
    async def all(self) -> list[Profession]:
        instance: ProfessionTable = await self._all()
        return [Profession.from_orm(profession) for profession in instance]

    async def get(self, key_: str, value_: Any) -> Profession:
        instance = await self._get(key=key_, value=value_)
        return Profession.from_orm(instance)

    #! Validated function
    async def create(self, schema: ProfessionUncommited) -> Profession:
        instance: ProfessionTable = await self._save(schema.dict())
        return Profession.from_orm(instance)

    #! Validated function
    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> Profession:
        instance: ProfessionTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return Profession.from_orm(instance)
