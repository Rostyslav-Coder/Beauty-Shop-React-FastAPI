"""src/domain/employees/repository.py"""

from typing import Any, AsyncGenerator

from sqlalchemy import Result, select
from sqlalchemy.orm import joinedload

from src.domain.employees import Employee, EmployeeUncommited
from src.infrastructure.database import BaseRepository, EmployeesTable
from src.infrastructure.errors import NotFoundError

__all__ = ("EmployeeRepository",)


class EmployeeRepository(BaseRepository[EmployeesTable]):
    schema_class = EmployeesTable

    async def all(self) -> AsyncGenerator[Employee, None]:
        async for instance in self._all():
            yield Employee.from_orm(instance)

    async def get(self, key_: str, value_: Any) -> Employee:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeesTable.user))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result: Result = await self.execute(query)

        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError

        return Employee.from_orm(_result)

    async def create(self, schema: EmployeeUncommited) -> Employee:
        instance: EmployeesTable = await self._save(schema.dict())
        return Employee.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: EmployeeUncommited
    ) -> Employee:
        instance: EmployeesTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return Employee.from_orm(instance)
