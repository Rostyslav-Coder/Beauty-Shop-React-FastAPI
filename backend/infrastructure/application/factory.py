"""
backend/infrastructure/application/factory.py

This module used for creating the application using FastAPI framework.
"""

import asyncio
from functools import partial
from typing import Callable, Coroutine, Iterable

from fastapi import APIRouter, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError

from backend.infrastructure.errors import (
    BaseError,
    custom_base_errors_handler,
    pydantic_validation_errors_handler,
    python_base_error_handler,
)

__all__ = ("create",)


def create(
    *_,
    rest_routers: Iterable[APIRouter],
    startup_tasks: Iterable[Callable[[], Coroutine]] | None = None,
    shutdown_tasks: Iterable[Callable[[], Coroutine]] | None = None,
    **kwargs,
) -> FastAPI:
    """
    The application factory using FastAPI framework.
    🎉 Only passing routes is mandatory to start.
    """

    # Initialize the base FastAPI application
    app = FastAPI(**kwargs)

    # Include REST API routers
    for router in rest_routers:
        app.include_router(router)

    origins = [
        "http://localhost.tiangolo.com",
        "https://localhost.tiangolo.com",
        "http://localhost",
        "http://localhost:8080",
    ]

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Extend FastAPI default error handlers
    app.exception_handler(RequestValidationError)(
        pydantic_validation_errors_handler
    )
    app.exception_handler(BaseError)(custom_base_errors_handler)
    app.exception_handler(ValidationError)(pydantic_validation_errors_handler)
    app.exception_handler(Exception)(python_base_error_handler)

    # Define startup tasks that are running asynchronous using FastAPI hook
    if startup_tasks:
        for task in startup_tasks:
            coro = partial(asyncio.create_task, task())
            app.on_event("startup")(coro)

    # Define shutdown tasks using FastAPI hook
    if shutdown_tasks:
        for task in shutdown_tasks:
            app.on_event("shutdown")(task)

    return app
