"""
backend/infrastructure/database/repository.py

This module includes base class for working with database.
"""

from typing import Any, Generic, Type

from sqlalchemy import Result, asc, delete, desc, func, select, update

from backend.infrastructure.database.session import Session
from backend.infrastructure.database.tables import ConcreteTable
from backend.infrastructure.errors import (
    DatabaseError,
    NotFoundError,
    UnprocessableError,
)

__all__ = ("BaseRepository",)


# Mypy error: https://github.com/python/mypy/issues/13755
class BaseRepository(Session, Generic[ConcreteTable]):  # type: ignore
    """
    This class implements the base interface for working with database
    and makes it easier to work with type annotations.
    """

    schema_class: Type[ConcreteTable]

    def __init__(self) -> None:
        super().__init__()

        if not self.schema_class:
            raise UnprocessableError(
                message=(
                    "Can not initiate the class without schema_class attribute"
                )
            )

    async def _all(self) -> list[ConcreteTable]:
        """
        Asynchronously yields all items of ConcreteTable type from the database.
        Returns an AsyncGenerator for ConcreteTable objects or None.
        """

        result: Result = await self.execute(select(self.schema_class))

        if not (_result := result.scalars().all()):
            raise NotFoundError

        return _result

    async def _get(self, key: str, value: Any) -> ConcreteTable:
        """
        Return only one result by filters.
        """

        query = select(self.schema_class).where(
            getattr(self.schema_class, key) == value
        )
        result: Result = await self.execute(query)

        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError

        return _result

    async def _count(self) -> int:
        """
        Retrieves the count of items in the database corresponding to the schema class.
        """

        result: Result = await self.execute(
            func.count(self.schema_class.id)  # pylint: disable=E1102
        )
        value = result.scalar()

        if not isinstance(value, int):
            raise UnprocessableError(
                message=(
                    "For some reason count function returned not an integer."
                    f"Value: {value}"
                ),
            )

        return value

    async def _first(self, by: str = "id") -> ConcreteTable:
        """
        Retrieves the first item from the database table based
        on the specified ordering criteria.
        """

        result: Result = await self.execute(
            select(self.schema_class).order_by(asc(by)).limit(1)
        )

        if not (_result := result.scalar_one_or_none()):
            raise NotFoundError

        return _result

    async def _last(self, by: str = "id") -> ConcreteTable:
        """
        Retrieves the last item from the database table based
        on the specified ordering criteria.
        """

        result: Result = await self.execute(
            select(self.schema_class).order_by(desc(by)).limit(1)
        )

        if not (_result := result.scalar_one_or_none()):
            raise NotFoundError

        return _result

    async def _save(self, payload: dict[str, Any]) -> ConcreteTable:
        """
        Saves the data in the payload to the database.
        """

        try:
            schema = self.schema_class(**payload)
            self._session.add(schema)
            await self._session.flush()
            await self._session.refresh(schema)
            return schema
        except self._ERRORS:
            raise DatabaseError

    async def _delete(self, id_: int) -> None:
        """
        Deletes an item from the database based on the provided id.
        """

        await self.execute(
            delete(self.schema_class).where(self.schema_class.id == id_)
        )
        await self._session.flush()

    async def _update(
        self, key: str, value: Any, payload: dict[str, Any]
    ) -> ConcreteTable:
        """
        Updates an existed instance of the model in the related table.
        If some data is not exist in the payload then the null value will
        be passed to the schema class.
        """

        query = (
            update(self.schema_class)
            .where(getattr(self.schema_class, key) == value)
            .values(payload)
            .returning(self.schema_class)
        )
        result: Result = await self.execute(query)
        await self._session.flush()

        if not (schema := result.scalar_one_or_none()):
            raise DatabaseError

        return schema
