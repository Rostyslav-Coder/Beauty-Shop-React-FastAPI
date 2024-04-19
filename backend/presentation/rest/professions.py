"""
backend/presentation/rest/professions.py

This module contains all profession routes.
"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import get_current_user
from backend.domain.professions import (
    Profession,
    ProfessionCreateRequestBody,
    ProfessionPublic,
    ProfessionRepository,
    ProfessionUncommited,
)
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(
    prefix="/professions", tags=["Route for managing professions"]
)


#! Validated endpoint
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def profession_create(
    _: Request,
    schema: ProfessionCreateRequestBody,
    user: User = Depends(get_current_user),
) -> Response[ProfessionPublic]:
    """Add current profession"""

    # Only admin can create profession
    if user.role != "ADMIN":
        raise AuthenticationError

    # Create new profession
    profession: Profession = await ProfessionRepository().create(
        ProfessionUncommited(**schema.dict())
    )
    profession_public = ProfessionPublic.from_orm(profession)

    return Response[ProfessionPublic](result=profession_public)


#! Validated endpoint
@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def profession_all(_: Request) -> ResponseMulti[ProfessionPublic]:
    """Get all current professions"""

    # Get professions list from database
    professions = await ProfessionRepository().all()
    professions_public: list[ProfessionPublic] = [
        ProfessionPublic.from_orm(profession) for profession in professions
    ]

    return ResponseMulti[ProfessionPublic](result=professions_public)


#! Validated endpoint
@router.put("/update", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def profession_update(
    _: Request,
    profession_id: int,
    payload_kay: str,
    payload_value: str,
    user: User = Depends(get_current_user),
) -> Response[ProfessionPublic]:
    """Update current profession"""

    # Only admin can update profession
    if user.role != "ADMIN":
        raise AuthenticationError

    # Prepare data for payload
    payload = {payload_kay: payload_value}

    # Update profession
    profession: Profession = await ProfessionRepository().update(
        key_="id",
        value_=profession_id,
        payload_=payload,
    )
    profession_public = ProfessionPublic.from_orm(profession)

    return Response[ProfessionPublic](result=profession_public)
