"""backend/presentation/rest/professions.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired
from backend.domain.constants import UserRole
from backend.domain.professions import (
    Profession,
    ProfessionCreateRequestBody,
    ProfessionPublic,
    ProfessionRepository,
    ProfessionUncommited,
)
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(
    prefix="/profession", tags=["Route for managing current profession"]
)


@router.post("/add", status_code=status.HTTP_201_CREATED)
@transaction
async def profession_create(
    _: Request,
    schema: ProfessionCreateRequestBody,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[ProfessionPublic]:
    """Add current profession"""

    # Create new profession
    profession: Profession = await ProfessionRepository().create(
        ProfessionUncommited(**schema.dict())
    )

    # Get public model of profession from Database
    profession_public = ProfessionPublic.from_orm(profession)

    return Response[ProfessionPublic](result=profession_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def profession_all(_: Request) -> ResponseMulti[ProfessionPublic]:
    """Get all current professions"""

    # Get professions list from database
    professions_generator: Profession = ProfessionRepository().all()

    # Convert generator to a list
    professions_public: list[ProfessionPublic] = [
        profession async for profession in professions_generator
    ]

    return ResponseMulti[ProfessionPublic](result=professions_public)


@router.put("/update", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def profession_update_name(
    _: Request,
    profession_id: int,
    profession_kay: str,
    profession_value: str,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[ProfessionPublic]:
    """Update profession name"""

    # Prepare data for update
    payload = {profession_kay: profession_value}

    # Update current profession
    profession: Profession = await ProfessionRepository().update(
        key_="id",
        value_=profession_id,
        payload_=payload,
    )

    # Get public model of profession from Database
    profession_public = ProfessionPublic.from_orm(profession)

    return Response[ProfessionPublic](result=profession_public)
