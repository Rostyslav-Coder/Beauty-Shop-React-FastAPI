"""backend/presentation/rest/profession.py"""

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
    prefix="/profession", tags=["Route for managing current professions"]
)


@router.post("/add", status_code=status.HTTP_201_CREATED)
@transaction
async def profession_create(
    _: Request,
    schema: ProfessionCreateRequestBody,
    user=Depends(RoleRequired(UserRole.ADMIN)),
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
    """Get all current profession"""

    # Get professions list from database
    professions_generator: ProfessionPublic = ProfessionRepository().all()

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
    user=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[ProfessionPublic]:
    """Update profession name"""

    #
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
