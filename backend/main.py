"""
backend/main.py

This module is the main entry point of the application.
"""

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from loguru import logger

from backend.config import settings
from backend.infrastructure import application, database
from backend.presentation import rest

# Adjust the logging
# ============================================================
logger.add(
    "".join(
        [
            str(settings.root_dir),
            "/logs/",
            settings.logging.file.lower(),
            ".log",
        ]
    ),
    format=settings.logging.format,
    rotation=settings.logging.rotation,
    compression=settings.logging.compression,
    level="INFO",
)


# Adjust the application
# ============================================================
app: FastAPI = application.create(
    debug=settings.debug,
    rest_routers=(
        # rest.admin.router,
        rest.authentication.router,
        rest.bookings.router,
        rest.employees.router,
        rest.offers.router,
        rest.professions.router,
        rest.react_router_dom.router,
        rest.services.router,
        rest.users.router,
    ),
    startup_tasks=[database.create_tables],
    shutdown_tasks=[],
)


# Mount static files
# ============================================================
app.mount("/", StaticFiles(directory="dist", html=True), name="static")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
