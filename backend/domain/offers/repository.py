"""
backend/domain/offers/repository.py

This module includes all database requests for the offers interaction.
"""

from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import joinedload

from backend.domain.offers import Offer, OfferUncommited, OfferWithService
from backend.infrastructure.database import BaseRepository, OfferTable

__all__ = ("OfferRepository",)


class OfferRepository(BaseRepository[OfferTable]):
    schema_class = OfferTable

    async def all(self) -> list[Offer]:
        instance: OfferTable = await self._all()
        return [Offer.from_orm(offer) for offer in instance]

    #! Validated function
    async def all_by(self, key_: str, value_: Any) -> list[OfferWithService]:
        stmt = (
            select(self.schema_class)
            .where(getattr(self.schema_class, key_) == value_)
            .options(joinedload(OfferTable.service))
        )
        result = await self._session.execute(stmt)
        return [OfferWithService.from_orm(offer) for offer in result.scalars()]

    async def get(self, key_: str, value_: Any) -> Offer:
        instance = await self._get(key=key_, value=value_)
        return Offer.from_orm(instance)

    #! Validated function
    async def create(self, schema: OfferUncommited) -> Offer:
        instance: OfferTable = await self._save(schema.dict())
        return Offer.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: OfferUncommited
    ) -> Offer:
        instance: OfferTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return Offer.from_orm(instance)
