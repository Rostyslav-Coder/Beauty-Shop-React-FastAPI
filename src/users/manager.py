"""src/users/manager.py"""

from uuid import UUID

from fastapi import Depends, Request
from fastapi_users import (
    BaseUserManager,
    UUIDIDMixin,
    exceptions,
    models,
    schemas,
)

from src.config import MANAGER_PASS_SECRET, MANAGER_VERIF_SECRET
from src.users.models import User
from src.users.utils import get_user_db


class UserManager(UUIDIDMixin, BaseUserManager[User, UUID]):
    """Class to manage Users"""

    reset_password_token_secret = MANAGER_PASS_SECRET
    verification_token_secret = MANAGER_VERIF_SECRET

    async def on_after_register(
        self, user: User, request: Request | None = None
    ) -> None:
        print(f"User {user.id} has registered.")
        return await super().on_after_register(user, request)

    async def on_after_request_verify(
        self, user: User, token: str, request: Request | None = None
    ) -> None:
        print(
            f"Verification requested for user {user.id}. Verification token: {token}"
        )
        return await super().on_after_request_verify(user, token, request)

    async def create(
        self,
        user_create: schemas.UC,
        safe: bool = False,
        request: Request | None = None,
    ) -> models.UP:
        await self.validate_password(user_create.password, user_create)

        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = (
            user_create.create_update_dict()
            if safe
            else user_create.create_update_dict_superuser()
        )
        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)

        created_user = await self.user_db.create(user_dict)

        await self.on_after_register(created_user, request)

        return created_user


async def get_user_manager(
    user_db=Depends(get_user_db),
):
    """Function to create User`s managment"""
    yield UserManager(user_db)
