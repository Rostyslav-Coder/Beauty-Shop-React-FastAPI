"""backend/presentation/rest/services.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired
from backend.domain.constants import UserRole
from backend.domain.services import (
    Service,
    ServiceCreateRequestBody,
    ServicePublic,
    ServiceRepository,
    ServiceUncommited,
    ServiceUnexpanded,
)
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/services", tags=["Services"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def service_create(
    _: Request,
    schema: ServiceCreateRequestBody,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[ServicePublic]:
    """Create new service"""

    # Create the Service in DB
    service: ServiceUnexpanded = await ServiceRepository().create(
        ServiceUncommited(**schema.dict())
    )

    # Get expanded service model from DB
    service_expanded: Service = await ServiceRepository().get(
        key_="id", value_=service.id
    )
    service_public = ServicePublic.from_orm(service_expanded)

    return Response[ServicePublic](result=service_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def service_all(
    _: Request, skip: int, limit: int
) -> ResponseMulti[ServicePublic]:
    """Get All Services"""

    # Get all Services from DB
    services: list[Service] = await ServiceRepository().all(
        skip_=skip, limit_=limit
    )
    services_public = [ServicePublic.from_orm(service) for service in services]

    return ResponseMulti[ServicePublic](result=services_public)


@router.get("/all_by_prfsn", status_code=status.HTTP_200_OK)
@transaction
async def service_all_by_prfsn(
    _: Request,
    skip: int,
    limit: int,
    profession_id: int,
) -> ResponseMulti[ServicePublic]:
    """Get All Services by Profession"""

    # Get all Services from DB by Associated Profession ID
    services: list[Service] = await ServiceRepository().all_by_prfsn(
        profession_id_=profession_id,
        skip_=skip,
        limit_=limit,
    )
    services_public = [ServicePublic.from_orm(service) for service in services]

    return ResponseMulti[ServicePublic](result=services_public)
