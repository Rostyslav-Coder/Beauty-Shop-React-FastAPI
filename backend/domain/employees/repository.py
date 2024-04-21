"""
backend/domain/employees/repository.py

This module includes all database requests for the employees interaction.
"""

from typing import Any

from sqlalchemy import Result, select
from sqlalchemy.orm import joinedload

from backend.domain.employees import (
    Employee,
    EmployeeUncommited,
    UserEmployeeProf,
)
from backend.infrastructure.database import BaseRepository, EmployeeTable
from backend.infrastructure.errors import NotFoundError

__all__ = ("EmployeeRepository",)


class EmployeeRepository(BaseRepository[EmployeeTable]):
    schema_class = EmployeeTable

    #! Validated function
    async def all(self, skip_: int, limit_: int) -> list[UserEmployeeProf]:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeeTable.user))
            .options(joinedload(EmployeeTable.profession))
            .offset(skip_)
            .limit(limit_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().all()):
            raise NotFoundError
        return [UserEmployeeProf.from_orm(employee) for employee in _result]

    #! Validated function
    async def all_by(
        self, key_: str, value_: Any, skip_: int, limit_: int
    ) -> list[UserEmployeeProf]:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeeTable.user))
            .options(joinedload(EmployeeTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
            .offset(skip_)
            .limit(limit_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().all()):
            raise NotFoundError
        return [UserEmployeeProf.from_orm(employee) for employee in _result]

    #! Validated function
    async def get(self, key_: str, value_: Any) -> UserEmployeeProf:
        query = (
            select(self.schema_class)
            .options(joinedload(EmployeeTable.user))
            .options(joinedload(EmployeeTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        result: Result = await self.execute(query)
        if not (_result := result.scalars().one_or_none()):
            raise NotFoundError
        return UserEmployeeProf.from_orm(_result)

    #! Validated function
    async def create(self, schema: EmployeeUncommited) -> Employee:
        instance: EmployeeTable = await self._save(schema.dict())
        return Employee.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: dict[str, Any]
    ) -> UserEmployeeProf:
        instance: EmployeeTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        # Create a select query with joinedload for the related models
        stmt = (
            select(self.schema_class)
            .options(joinedload(EmployeeTable.user))
            .options(joinedload(EmployeeTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        # Execute the query
        result = await self._session.execute(stmt)
        instance = result.scalars().first()
        return UserEmployeeProf.from_orm(instance)
