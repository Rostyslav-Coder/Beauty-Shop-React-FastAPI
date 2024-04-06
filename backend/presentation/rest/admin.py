"""backend/presentation/rest/admin.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired
from backend.domain.constants import UserRole
from backend.domain.employees import (
    Employee,
    EmployeePublic,
    EmployeeRepository,
)
from backend.domain.users import User, UserPublic, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/admin", tags=["Administration"])


@router.get("/employee/profession", status_code=status.HTTP_200_OK)
@transaction
async def employee_profession(
    _: Request,
    skip: int,
    limit: int,
    profession_id: str,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
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


@router.put("/employee/delete", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def employee_delete(
    _: Request,
    employee_id: str,
    user_=Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[UserPublic]:
    """Update employee to user"""

    payload = {"role": UserRole.USER}
    employee: Employee = await EmployeeRepository().update(
        key_="id", value_=employee_id, payload_=payload
    )
    print(employee)
    payload = {"is_active": employee_id}
    user: User = await UsersRepository().update(
        key_="id",
        value_=employee.user_id,
        payload_=payload,
    )
    print(user)
    user_public = UserPublic.from_orm(user)
    print(user_public)
    return Response[UserPublic](result=user_public)
