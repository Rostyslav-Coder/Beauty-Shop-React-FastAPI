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
from backend.domain.users import User, UserPublic, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/admin", tags=["Administration"])


@router.get("/employee/user", status_code=status.HTTP_200_OK)
@transaction
async def get_employee_user(
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
) -> Response[EmployeePublic]:
    """Creates an addition to the user, as for an employee"""

    employee: Employee = await EmployeeRepository().create(
        EmployeeUncommited(schema.dict())
    )
    user_employee = Employee.from_orm(employee)

    user_employee_updated = await EmployeeRepository().update(
        key_="id",
        value_=employee.id,
        payload_={user_employee.user.role: UserRole.EMPLOYEE},
    )
    user_employee_public = EmployeePublic.from_orm(user_employee_updated)

    return Response[EmployeePublic](result=user_employee_public)


@router.get("/employee/get", status_code=status.HTTP_200_OK)
@transaction
async def employee_get(
    _: Request,
    user_employee_id: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[EmployeePublic]:
    """Get current employee by id masked by name in frontend"""

    user_employee: EmployeePublic = await UsersRepository().get(
        key_="id", value_=user_employee_id
    )

    return Response[EmployeePublic](result=user_employee)


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
    profession: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> ResponseMulti[list[EmployeePublic]]:
    """Get all employees by profession"""

    employees_by_profession: list[
        EmployeePublic
    ] = await EmployeeRepository()._all_by(
        key_="profession", value_=profession, skip_=skip, limit_=limit
    )

    return ResponseMulti[list[EmployeePublic]](result=employees_by_profession)


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
