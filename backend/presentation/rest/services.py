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
from backend.infrastructure.models import Response

router = APIRouter(prefix="/services", tags=["Services"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def service_create(
    _: Request,
    schema: ServiceCreateRequestBody,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[ServicePublic]:
    """Create new service"""

    # Create the Service object
    service: ServiceUnexpanded = await ServiceRepository().create(
        ServiceUncommited(**schema.dict())
    )

    # Get expanded service model from DB
    service_expanded: Service = await ServiceRepository().get(
        key_="id", value_=service.id
    )
    service_public = ServicePublic.from_orm(service_expanded)

    return Response[ServicePublic](result=service_public)
