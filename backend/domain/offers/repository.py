"""backend/domain/offers/repository.py"""

from typing import Any, AsyncGenerator

from backend.domain.offers import Offer, OfferPublic, OfferUncommited
from backend.infrastructure.database import BaseRepository, OfferTable

__all__ = ("OfferRepository",)


class OfferRepository(BaseRepository[OfferTable]):
    schema_class = OfferTable

    async def all(self) -> AsyncGenerator[OfferPublic, None]:
        async for instance in self._all():
            yield OfferPublic.from_orm(instance)

    async def all_by(
        self, key_: str, value_: Any
    ) -> AsyncGenerator[OfferPublic, None]:
        async for instance in self._all_by(key=key_, value=value_):
            yield OfferPublic.from_orm(instance)

    async def get(self, key_: str, value_: Any) -> OfferPublic:
        instance = await self._get(key=key_, value=value_)
        return OfferPublic.from_orm(instance)

    async def create(self, schema: OfferUncommited) -> Offer:
        instance: OfferTable = await self._save(schema.dict())
        return Offer.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: OfferUncommited
    ) -> OfferPublic:
        instance: OfferTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return OfferPublic.from_orm(instance)
