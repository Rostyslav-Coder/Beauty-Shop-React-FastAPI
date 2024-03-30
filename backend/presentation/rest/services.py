"""backend/presentation/rest/services.py"""

from datetime import timedelta
from decimal import Decimal

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired, get_current_user
from backend.domain.constants import UserRole
from backend.domain.employees import Employee, EmployeeRepository
from backend.domain.services import (
    Service,
    ServiceCreateRequestBody,
    ServicePublic,
    ServiceRepository,
    ServiceUncommited,
)
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import BadRequestError
from backend.infrastructure.models import Response, ResponseMulti

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


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def services_get_all(
    _: Request,
    skip: int,
    limit: int,
    user: User = Depends(get_current_user),
) -> ResponseMulti[ServicePublic]:
    """Get all services"""


@router.put("/update_name", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def services_update_name(
    _: Request,
    service_id: int,
    new_name: str | None,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[ServicePublic]:
    """Update values in a service data"""

    # Get the employee associated with the user
    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Check employee permissions
    raw_service: Service = ServiceRepository().get(
        key_="id", value_=service_id
    )
    if raw_service.employee_id != employee.id:
        raise BadRequestError

    # Update service from database
    payload = {"name": new_name}
    service: Service = ServiceRepository().update(
        key_="id", value_=service_id, payload_=payload
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)


@router.put("/update_title", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def services_update_title(
    _: Request,
    new_title: str | None,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[ServicePublic]:
    """Update values in a service data"""

    # Get the employee associated with the user
    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Update service from database
    payload = {"title": new_title}
    service: Service = ServiceRepository().update(
        key_="employee_id", value_=employee.id, payload_=payload
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)


@router.put("/update_duration", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def services_update_duration(
    _: Request,
    new_duration: timedelta | None,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[ServicePublic]:
    """Update values in a service data"""

    # Get the employee associated with the user
    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Update service from database
    payload = {"duration": new_duration}
    service: Service = ServiceRepository().update(
        key_="employee_id", value_=employee.id, payload_=payload
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)


@router.put("/update_price", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def services_update_price(
    _: Request,
    new_price: Decimal | None,
    user=Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[ServicePublic]:
    """Update values in a service data"""

    # Get the employee associated with the user
    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Update service from database
    payload = {"price": new_price}
    service: Service = ServiceRepository().update(
        key_="employee_id", value_=employee.id, payload_=payload
    )
    service_public = ServicePublic.from_orm(service)

    return Response[ServicePublic](result=service_public)
