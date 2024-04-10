"""backend/domain/offers/repository.py"""

from typing import Any, AsyncGenerator

from backend.domain.offers import Offer, OfferUncommited
from backend.infrastructure.database import BaseRepository, OfferTable

__all__ = ("OfferRepository",)


class OfferRepository(BaseRepository[OfferTable]):
    schema_class = OfferTable

    async def all(self) -> AsyncGenerator[Offer, None]:
        async for instance in self._all():
            yield Offer.from_orm(instance)

    async def all_by(
        self, key_: str, value_: Any
    ) -> AsyncGenerator[Offer, None]:
        async for instance in self._all_by(key=key_, value=value_):
            yield Offer.from_orm(instance)

    async def get(self, key_: str, value_: Any) -> Offer:
        instance = await self._get(key=key_, value=value_)
        return Offer.from_orm(instance)

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
