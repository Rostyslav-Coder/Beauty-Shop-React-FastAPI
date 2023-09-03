"""src/presentation/rest/employees.py"""

from fastapi import APIRouter, Depends, Request, status

from src.application.authentication import RoleRequired
from src.domain.constants import UserRole, WorkingDays
from src.domain.employees import (
    Employee,
    EmployeeCreateRequestBody,
    EmployeePublic,
    EmployeeRepository,
    EmployeeUncommited,
)
from src.domain.users import User
from src.infrastructure.database import transaction
from src.infrastructure.models import Response  # ResponseMulti

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def employee_create(
    _: Request,
    schema: EmployeeCreateRequestBody,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[EmployeePublic]:
    """Creates an addition to the user, as for an employee"""

    # Associating an employee record with a user
    schema.user_id = user.id

    # Save new employee to the database
    employee: Employee = await EmployeeRepository().create(
        EmployeeUncommited(**schema.dict())
    )
    employee_public = EmployeePublic.from_orm(employee)

    return Response[EmployeePublic](result=employee_public)


@router.put("/update_days", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def employee_update_days(
    _: Request,
    new_days: WorkingDays,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[EmployeePublic]:
    """Update employees working days"""

    # Update employees working days
    payload = {"working_days": new_days}
    employee: Employee = await EmployeeRepository().update(
        key_="user_id", value_=user.id, payload_=payload
    )
    employee_public = EmployeePublic.from_orm(employee)

    return Response[EmployeePublic](result=employee_public)


@router.get("/get", status_code=status.HTTP_200_OK)
@transaction
async def employee_get(
    _: Request,
    employee_id: int,
) -> Response[EmployeePublic]:
    """Get employee with user, full model"""

    employee: Employee = await EmployeeRepository().get(
        key_="id", value_=employee_id
    )
    employee_public = EmployeePublic.from_orm(employee)

    return Response[EmployeePublic](result=employee_public)
