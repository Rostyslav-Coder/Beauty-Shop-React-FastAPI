"""
backend/domain/authentication/models.py

This module includes all models for the authentication interaction.
"""

from pydantic import Field

from backend.domain.constants import UserRole
from backend.infrastructure.models import InternalModel, PublicModel

__all__ = (
    "TokenClaimRequestBody",
    "TokenClaimPublic",
    "TokenPayload",
    "AccessToken",
    "RefreshToken",
)


# Public models
# ============================================================
class TokenClaimRequestBody(PublicModel):
    login: str = Field(description="User login")
    password: str = Field(description="User password")


class TokenClaimPublic(PublicModel):
    access: str = Field(description="Access token")
    refresh: str = Field(description="Refresh token")


# Internal models
# ============================================================
class TokenPayload(InternalModel):
    sub: int
    email: str
    role: UserRole
    exp: int


class AccessToken(InternalModel):
    payload: TokenPayload
    raw_token: str


class RefreshToken(InternalModel):
    payload: TokenPayload
    raw_token: str
