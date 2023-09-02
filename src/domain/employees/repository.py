"""src/domain/employees/repository.py"""

from typing import Any, AsyncGenerator

from sqlalchemy.orm import joinedload

from src.domain.employees import Employee, EmployeeUncommited
from src.infrastructure.database import BaseRepository, EmployeesTable

__all__ = ("EmployeeRepository",)


class EmployeeRepository(BaseRepository[EmployeesTable]):
    schema_class = EmployeesTable

    async def all(self) -> AsyncGenerator[Employee, None]:
        async for instance in self._all():
            yield Employee.from_orm(instance)

    async def get(self, key_: str, value_: Any) -> Employee:
        instance = (
            await self._session.query(EmployeesTable)
            .options(joinedload(EmployeesTable.user))
            .filter(getattr(EmployeesTable, key_) == value_)
            .first()
        )
        return Employee.from_orm(instance)

    async def create(self, schema: EmployeeUncommited) -> Employee:
        instance: EmployeesTable = await self._save(schema.dict())
        return Employee.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: EmployeeUncommited
    ) -> Employee:
        instance: EmployeesTable = await self._update(
            key=key_, value=value_, payload=payload_.dict()
        )
        return Employee.from_orm(instance)
