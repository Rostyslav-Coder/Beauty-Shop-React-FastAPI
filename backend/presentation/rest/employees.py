"""src/presentation/rest/employees.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired, get_current_user
from backend.domain.constants import UserRole, WorkingDays, WorkingShift
from backend.domain.employees import (
    Employee,
    EmployeeCreateRequestBody,
    EmployeePublic,
    EmployeeRepository,
    EmployeeUncommited,
    UserEmployee,
    UserEmployeePublic,
)
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

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


@router.put("/update_shift", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def employee_update_shift(
    _: Request,
    new_shift: WorkingShift,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[EmployeePublic]:
    """Update employees working shift"""

    # Update employees working shift
    payload = {"working_shift": new_shift}
    employee: EmployeeUncommited = await EmployeeRepository().update(
        key_="user_id", value_=user.id, payload_=payload
    )
    employee_public = EmployeePublic.from_orm(employee)

    return Response[EmployeePublic](result=employee_public)


@router.get("/get", status_code=status.HTTP_200_OK)
@transaction
async def employee_get(
    _: Request,
    employee_id: int,
    user: User = Depends(get_current_user),  # pylint: disable=W0613
) -> Response[EmployeePublic]:
    """Get employee with user data, full model"""

    # Get employee from database
    employee: UserEmployee = await EmployeeRepository().get(
        key_="id", value_=employee_id
    )
    employee_public = UserEmployeePublic.from_orm(employee)

    return Response[UserEmployeePublic](result=employee_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def employee_all(
    _: Request,
    skip: int = None,
    limit: int = None,
    user: User = Depends(get_current_user),  # pylint: disable=W0613
) -> ResponseMulti[UserEmployeePublic]:
    """Get employees list with user data, full model"""

    # Get employees list from database
    employees: UserEmployeePublic = await EmployeeRepository().all(
        skip_=skip, limit_=limit
    )

    return ResponseMulti[UserEmployeePublic](result=employees)
