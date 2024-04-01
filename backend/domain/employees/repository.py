"""backend/domain/employees/repository.py"""

from typing import Any

from sqlalchemy import Result, select
from sqlalchemy.orm import joinedload

from backend.domain.employees import (
    Employee,
    EmployeeUncommited,
    EmployeeUnexpanded,
)
from backend.infrastructure.database import BaseRepository, EmployeesTable
from backend.infrastructure.errors import NotFoundError

__all__ = ("EmployeeRepository",)


class EmployeeRepository(BaseRepository[EmployeesTable]):
    schema_class = EmployeesTable

    async def all(self, skip_: int = 0, limit_: int = 10) -> list[Employee]:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeesTable.user))
            .options(joinedload(EmployeesTable.profession))
            .offset(skip_)
            .limit(limit_)
        )
        result: Result = await self.execute(query)
        employees = [
            Employee.from_orm(employee) for employee in result.scalars().all()
        ]
        return employees

    async def _all_by(
        self, key_: str, value_: Any, skip_: int = 0, limit_: int = 10
    ) -> list[Employee]:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeesTable.user))
            .options(joinedload(EmployeesTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
            .offset(skip_)
            .limit(limit_)
        )
        result: Result = await self.execute(query)
        employees = [
            Employee.from_orm(employee) for employee in result.scalars().all()
        ]
        return employees

    async def get(self, key_: str, value_: Any) -> Employee:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeesTable.user))
            .options(joinedload(EmployeesTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError
        employee = Employee.from_orm(_result)
        return employee

    async def create(self, schema: EmployeeUncommited) -> Employee:
        instance: EmployeesTable = await self._save(schema.dict())
        employee = EmployeeUnexpanded.from_orm(instance)
        return employee

    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> Employee:
        instance: EmployeesTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        await self._session.refresh(instance)
        employee = Employee.from_orm(instance)
        return employee
