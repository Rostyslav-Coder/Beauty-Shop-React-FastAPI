"""
backend/domain/users/repository.py

This module includes all database requests for the users interaction.
"""

from typing import Any

# from backend.domain.constants import UserRole
from backend.domain.users import User, UserUncommited  # , UserEmployee
from backend.infrastructure.database import (  # EmployeesTable,
    BaseRepository,
    UserTable,
)

# from sqlalchemy import Result, select
# from sqlalchemy.orm import joinedload

# from backend.infrastructure.errors.base import NotFoundError

__all__ = ("UsersRepository",)


class UsersRepository(BaseRepository[UserTable]):
    schema_class = UserTable

    #! Validated function
    async def all(self) -> list[User]:
        instance: UserTable = await self._all()
        return [User.from_orm(user) for user in instance]

    async def get(self, key_: str, value_: Any) -> User:
        instance: UserTable = await self._get(key=key_, value=value_)
        return User.from_orm(instance)

    #! Validated function
    async def create(self, schema: UserUncommited) -> User:
        instance: UserTable = await self._save(schema.dict())
        return User.from_orm(instance)

    async def update(
        self, key_: str, value_: Any, payload_: dict[str:Any]
    ) -> User:
        instance: UserTable = await self._update(
            key=key_, value=value_, payload=payload_
        )
        return User.from_orm(instance)

    # async def all_users_employee(
    #     self, skip_: int, limit_: int
    # ) -> list[UserEmployee, None]:
    #     query = (
    #         select(self.schema_class)
    #         .options(joinedload(UsersTable.employee))
    #         .options(
    #             joinedload(UsersTable.employee).joinedload(
    #                 EmployeesTable.profession
    #             )
    #         )
    #         .where(self.schema_class.role == UserRole.EMPLOYEE)
    #         .offset(skip_)
    #         .limit(limit_)
    #     )
    #     instance: Result = await self.execute(query)
    #     if not (_instance := instance.scalars().all()):
    #         raise NotFoundError
    #     users = [UserEmployee.from_orm(user) for user in _instance]
    #     return users

    # async def get_user_employee(self, key_: str, value_: Any) -> UserEmployee:
    #     query = (
    #         select(self.schema_class)
    #         .options(joinedload(UsersTable.employee))
    #         .options(joinedload(EmployeesTable.profession))
    #         .where(getattr(self.schema_class, key_) == value_)
    #     )
    #     imstance = await self.execute(query)
    #     return UserEmployee.from_orm(imstance)
