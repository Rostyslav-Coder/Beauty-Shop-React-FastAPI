"""backend/presentation/rest/employees.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired, get_current_user
from backend.domain.constants import UserRole, WorkingDays, WorkingShift
from backend.domain.employees import (
    Employee,
    EmployeeCreateRequestBody,
    EmployeePublic,
    EmployeeRepository,
    EmployeeUncommited,
    EmployeeUnexpanded,
)
from backend.domain.users import User, UserPublic, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/employees", tags=["Employees"])


# Updated function
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def employee_create(
    _: Request,
    schema: EmployeeCreateRequestBody,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[EmployeePublic]:
    """Creates an addition to the user, as for an employee"""

    # Update user role
    await UsersRepository().update(
        key_="id", value_=schema.user_id, payload_={"role": UserRole.EMPLOYEE}
    )

    # Create the Employee object
    employee: EmployeeUnexpanded = await EmployeeRepository().create(
        EmployeeUncommited(**schema.dict())
    )

    # Get full employee from DB
    employee_full: Employee = await EmployeeRepository().get(
        key_="id", value_=employee.id
    )
    employee_public = EmployeePublic.from_orm(employee_full)

    return Response[EmployeePublic](result=employee_public)


# Updated function
@router.get("/get", status_code=status.HTTP_200_OK)
@transaction
async def employee_get(
    _: Request,
    employee_name: str,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[EmployeePublic]:
    """Get current employee by id"""

    user: User = await UsersRepository().get(
        key_="first_name", value_=employee_name
    )
    user_public = UserPublic.from_orm(user)

    employee: Employee = await EmployeeRepository().get(
        key_="user_id", value_=user_public.id
    )
    employee_public = EmployeePublic.from_orm(employee)

    return Response[EmployeePublic](result=employee_public)


@router.put("/update_days", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def employee_update_days(
    _: Request,
    new_days: WorkingDays,
    user=Depends(RoleRequired(UserRole.EMPLOYEE)),
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
    user=Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[EmployeePublic]:
    """Update employees working shift"""

    # Update employees working shift
    payload = {"working_shift": new_shift}
    employee: Employee = await EmployeeRepository().update(
        key_="user_id", value_=user.id, payload_=payload
    )
    employee_public = EmployeePublic.from_orm(employee)

    return Response[EmployeePublic](result=employee_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def employee_all(
    _: Request,
    skip: int = None,
    limit: int = None,
    user: User = Depends(get_current_user),  # pylint: disable=W0613
) -> ResponseMulti[EmployeePublic]:
    """Get employees list with user data, full model"""

    # Get employees list from database
    employees: EmployeePublic = await EmployeeRepository().all(
        skip_=skip, limit_=limit
    )

    return ResponseMulti[EmployeePublic](result=employees)
