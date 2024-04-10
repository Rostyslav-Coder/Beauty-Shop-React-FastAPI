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
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/services", tags=["Services"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def service_create(
    _: Request,
    schema: ServiceCreateRequestBody,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
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
async def service_all(_: Request) -> ResponseMulti[ServiceUnexpanded]:
    """Get All Services"""

    # Get services list from database
    services_generator: ServiceUnexpanded = ServiceRepository().all()

    # Convert generator to a services list
    services: list[ServiceUnexpanded] = [
        service async for service in services_generator
    ]

    return ResponseMulti[ServiceUnexpanded](result=services)


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


@router.put("/update", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def service_update(
    _: Request,
    service_id: int,
    service_key: str,
    service_value: str,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[ServicePublic]:
    """Update Service"""

    # Prepare data for update
    payload = {service_key: service_value}

    # Update Service by Service ID
    service: Service = await ServiceRepository().update(
        key_="id", value_=service_id, payload_=payload
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)
