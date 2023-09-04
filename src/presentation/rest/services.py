"""src/presentation/rest/services.py"""

from datetime import timedelta
from decimal import Decimal

from fastapi import APIRouter, Depends, Request, status

from src.application.authentication import RoleRequired  # , get_current_user
from src.domain.constants import UserRole
from src.domain.employees import Employee, EmployeeRepository
from src.domain.services import (
    Service,
    ServiceCreateRequestBody,
    ServicePublic,
    ServiceRepository,
    ServiceUncommited,
)
from src.domain.users import User
from src.infrastructure.database import transaction
from src.infrastructure.models import Response  # , ResponseMulti

router = APIRouter(prefix="/services", tags=["Services"])


@router.post("/add", status_code=status.HTTP_201_CREATED)
@transaction
async def services_add(
    _: Request,
    schema: ServiceCreateRequestBody,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[ServicePublic]:
    """Create new service"""

    # Get the employee associated with the user
    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Associating an employee record with a user
    schema.employee_id = employee.id

    # Save new service to the database
    service: Service = await ServiceRepository().create(
        ServiceUncommited(**schema.dict())
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)


@router.put("/update", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def services_update(
    _: Request,
    new_title: str | None,
    new_duration: timedelta | None,
    new_price: Decimal | None,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[ServicePublic]:
    """Update values in a service data"""

    # Get the employee associated with the user
    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Preparing Data for Update
    payload = {}
    if new_title:
        payload["title"] = new_title
    if new_duration:
        payload["duration"] = new_duration
    if new_price:
        payload["price"] = new_price

    # Update service from database
    service: Service = ServiceRepository().update(
        key_="employee_id", value_=employee.id, payload_=payload
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)
