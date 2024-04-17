"""
backend/presentation/rest/services.py

This module contains all service routes.
"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import get_current_user
from backend.domain.services import (
    Service,
    ServiceCreateRequestBody,
    ServicePublic,
    ServiceRepository,
    ServiceUncommited,
)
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/services", tags=["Route for managing services"])


#! Validated endpoint
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def service_create(
    _: Request,
    schema: ServiceCreateRequestBody,
    user: User = Depends(get_current_user),
) -> Response[ServicePublic]:
    """Create new service"""

    # Only admin can create service
    if user.role != "ADMIN":
        raise AuthenticationError

    # Create a new service in the database
    service: Service = await ServiceRepository().create(
        ServiceUncommited(**schema.dict())
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def services_all(_: Request) -> ResponseMulti[ServicePublic]:
    """Get All Services"""

    # Get services list from database
    services: Service = ServiceRepository().all()
    services_public = [
        ServicePublic.from_orm(service) async for service in services
    ]

    return ResponseMulti[ServicePublic](result=services_public)


@router.get("/all_by_profesion", status_code=status.HTTP_200_OK)
@transaction
async def services_all_by(
    _: Request,
    skip: int,
    limit: int,
    profession_id: int,
) -> ResponseMulti[ServicePublic]:
    """Get All Services by Profession"""

    # Get all Services from DB by Associated Profession ID
    services: list[Service] = await ServiceRepository().all_by_profesion(
        profession_id_=profession_id,
        skip_=skip,
        limit_=limit,
    )
    services_public = [ServicePublic.from_orm(service) for service in services]

    return ResponseMulti[ServicePublic](result=services_public)
