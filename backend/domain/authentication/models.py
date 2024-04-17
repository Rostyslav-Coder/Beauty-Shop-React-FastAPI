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
    login: str = Field("User Email")
    password: str = Field("User Password")


class TokenClaimPublic(PublicModel):
    access: str = Field("Access Token")
    refresh: str = Field("Refresh Token")


# Internal models
# ============================================================
class TokenPayload(InternalModel):
    sub: int
    role: UserRole
    exp: int


class AccessToken(InternalModel):
    payload: TokenPayload
    raw_token: str


class RefreshToken(InternalModel):
    payload: TokenPayload
    raw_token: str
