"""src/infrastructure/database/session.py"""

from contextvars import ContextVar

from sqlalchemy import Result
from sqlalchemy.exc import IntegrityError, PendingRollbackError
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from backend.config import settings
from backend.infrastructure.database.tables import Base
from backend.infrastructure.errors import DatabaseError

__all__ = (
    "get_session",
    "engine",
    "CTX_SESSION",
    "create_tables",
)


engine: AsyncEngine = create_async_engine(
    settings.database.url, future=True, pool_pre_ping=True, echo=False
)


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


def get_session(engine: AsyncEngine | None = engine) -> AsyncSession:
    Session: async_sessionmaker = async_sessionmaker(
        engine, expire_on_commit=False, autoflush=False
    )

    return Session()


CTX_SESSION: ContextVar[AsyncSession] = ContextVar(
    "session", default=get_session()
)


class Session:
    # All sqlalchemy errors that can be raised
    _ERRORS = (IntegrityError, PendingRollbackError)

    def __init__(self) -> None:
        self._session: AsyncSession = CTX_SESSION.get()

    async def execute(self, query) -> Result:
        try:
            result = await self._session.execute(query)
            return result
        except self._ERRORS:
            raise DatabaseError
