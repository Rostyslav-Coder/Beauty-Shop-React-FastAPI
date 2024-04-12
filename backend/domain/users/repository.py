"""backend/domain/users/repository.py"""

# Code updated

from typing import Any, AsyncGenerator

from sqlalchemy import Result, select
from sqlalchemy.orm import joinedload

from backend.domain.constants import UserRole
from backend.domain.users import User, UserEmployee, UserUncommited
from backend.infrastructure.database import (
    BaseRepository,
    EmployeesTable,
    UsersTable,
)
from backend.infrastructure.errors.base import NotFoundError

__all__ = ("UsersRepository",)


class UsersRepository(BaseRepository[UsersTable]):
    schema_class = UsersTable

    async def all(self, skip_: int, limit_: int) -> AsyncGenerator[User, None]:
        async for instance in self._all_limited(skip=skip_, limit=limit_):
            yield User.from_orm(instance)

    async def all_users_employee(
        self, skip_: int, limit_: int
    ) -> list[UserEmployee, None]:
        query = (
            select(self.schema_class)
            .options(joinedload(UsersTable.employee))
            .options(
                joinedload(UsersTable.employee).joinedload(
                    EmployeesTable.profession
                )
            )
            .where(self.schema_class.role == UserRole.EMPLOYEE)
            .offset(skip_)
            .limit(limit_)
        )
        instance: Result = await self.execute(query)
        if not (_instance := instance.scalars().all()):
            raise NotFoundError
        users = [UserEmployee.from_orm(user) for user in _instance]
        return users

    async def get(self, key_: str, value_: Any) -> User:
        instance = await self._get(key=key_, value=value_)
        return User.from_orm(instance)

    async def get_user_employee(self, key_: str, value_: Any) -> UserEmployee:
        query = (
            select(self.schema_class)
            .options(joinedload(UsersTable.employee))
            .options(joinedload(EmployeesTable.profession))
            .where(getattr(self.schema_class, key_) == value_)
        )
        imstance = await self.execute(query)
        return UserEmployee.from_orm(imstance)

    async def create(self, schema: UserUncommited) -> User:
        instance: UsersTable = await self._save(schema.dict())
        return User.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: UserUncommited
    ) -> User:
        instance: UsersTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return User.from_orm(instance)
