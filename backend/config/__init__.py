"""
backend/config/__init__.py

This module includes all shared utils and tools for the config interaction.
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from passlib.context import CryptContext
from pydantic import BaseConfig, BaseModel, BaseSettings

load_dotenv()


# Virtual environment variables
# ============================================================
ADMIN_KEY = os.environ.get("ADMIN_KEY")
# ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN_SECRET_KEY")
# REFRESH_TOKEN = os.environ.get("REFRESH_TOKEN_SECRET_KEY")


# API Settings
# ============================================================
class APIUrlSettings(BaseModel):
    docs: str = "/docs"
    redoc: str = "/redoc"


class PublicApiSettings(BaseModel):
    name: str = "Beauty-Shop"
    urls: APIUrlSettings = APIUrlSettings()


# Database Settings
# ============================================================
class DatabaseSettings(BaseModel):
    name: str = "db.sqlite3"

    @property
    def url(self) -> str:
        return f"sqlite+aiosqlite:///./{self.name}"


class KafkaSettings(BaseModel):
    bootstrap_servers: str = "localhost:9092"


# Logging Settings
# ============================================================
class LoggingSettings(BaseModel):
    """Configure the logging engine."""

    # The time field can be formatted using more human-friendly tokens.
    # These constitute a subset of the one used by the Pendulum library
    # https://pendulum.eustace.io/docs/#tokens
    format: str = "{time:YYYY-MM-DD HH:mm:ss} | {level: <5} | {message}"

    # The .log filename
    file: str = "backend"

    # The .log file Rotation
    rotation: str = "1MB"

    # The type of compression
    compression: str = "zip"


# Authentication Settings
# ============================================================
class AccessTokenSettings(BaseModel):
    secret_key: str = "SECRET_KEY"
    ttl: int = 3600  # seconds


class RefreshTokenSettings(BaseModel):
    secret_key: str = "SECRET_KEY"
    ttl: int = 86400  # seconds


class AuthenticationSettings(BaseModel):
    access_token: AccessTokenSettings = AccessTokenSettings()
    refresh_token: RefreshTokenSettings = RefreshTokenSettings()
    algorithm: str = "HS256"
    scheme: str = "Bearer"


pwd_context = CryptContext(schemes=["md5_crypt"], deprecated="auto")


# Settings
# ============================================================
class Settings(BaseSettings):
    debug: bool = True

    # Project file system
    root_dir: Path
    src_dir: Path

    # Infrastructure settings
    database: DatabaseSettings = DatabaseSettings()

    # Application configuration
    public_api: PublicApiSettings = PublicApiSettings()
    logging: LoggingSettings = LoggingSettings()
    authentication: AuthenticationSettings = AuthenticationSettings()

    class Config(BaseConfig):
        env_nested_delimiter: str = "__"
        env_file: str = ".env"


# Define the root path
# ============================================================
ROOT_PATH = Path(__file__).parent.parent


# ============================================================
# Load settings
# ============================================================
settings = Settings(
    # NOTE: We would like to hard-code the root and applications directories
    #       to avoid overriding via environment variables
    root_dir=ROOT_PATH,
    src_dir=ROOT_PATH / "backend",
)
