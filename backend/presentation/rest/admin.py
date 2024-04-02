"""backend/presentation/rest/admin.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired
from backend.domain.constants import UserRole
from backend.domain.employees import (
    Employee,
    EmployeeCreateRequestBody,
    EmployeePublic,
    EmployeeRepository,
    EmployeeUncommited,
)
from backend.domain.employees.models import EmployeeUnexpanded
from backend.domain.users import User, UserPublic, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/admin", tags=["Administration"])


@router.get("/employee/user", status_code=status.HTTP_200_OK)
@transaction
async def get_user_by_email(
    _: Request, user_email: str, user=Depends(RoleRequired(UserRole.ADMIN))
) -> Response[UserPublic]:
    """Obtaining user data for registration as an employee"""

    found_user: User = await UsersRepository().get(
        key_="email", value_=user_email
    )
    user_public = UserPublic.from_orm(found_user)

    return Response[UserPublic](result=user_public)


@router.post("/employee/create", status_code=status.HTTP_201_CREATED)
@transaction
async def employee_create(
    _: Request,
    schema: EmployeeCreateRequestBody,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
):
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


@router.get("/employee/get", status_code=status.HTTP_200_OK)
@transaction
async def employee_get(
    _: Request,
    employee_id: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[EmployeePublic]:
    """Get current employee by id masked by name in frontend"""

    employee_public: EmployeePublic = await EmployeeRepository().get(
        key_="id", value_=employee_id
    )

    return Response[EmployeePublic](result=employee_public)


@router.get("/employee/all", status_code=status.HTTP_200_OK)
@transaction
async def employee_get_all(
    _: Request,
    skip: int,
    limit: int,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> ResponseMulti[list[EmployeePublic]]:
    """Get all employees"""

    user_employees: list[EmployeePublic] = await EmployeeRepository().all(
        skip_=skip, limit_=limit
    )

    return ResponseMulti[list[EmployeePublic]](result=user_employees)


@router.get("/employee/profession", status_code=status.HTTP_200_OK)
@transaction
async def employee_profession(
    _: Request,
    skip: int,
    limit: int,
    profession_id: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> ResponseMulti[EmployeePublic]:
    """Get all employees by profession"""

    employees_by_professon: list[
        Employee
    ] = await EmployeeRepository()._all_by(
        key_="profession_id", value_=profession_id, skip_=skip, limit_=limit
    )

    employees_public = [
        EmployeePublic.from_orm(employee)
        for employee in employees_by_professon
    ]

    return ResponseMulti[EmployeePublic](result=employees_public)


@router.put("/emplotee/delate", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def employee_delete(
    _: Request,
    user_employee_id: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[UserPublic]:
    """Update employee to user"""

    raw_employee: Employee = await EmployeeRepository().update(
        key_="id", value_=user_employee_id, payload_={"is_active": False}
    )

    raw_user: User = await UsersRepository().update(
        key_="id",
        value_=raw_employee.user_id,
        payload_={"role": UserRole.USER},
    )

    user: UserPublic = User.from_orm(raw_user)

    return Response[UserPublic](result=user)
