"""backend/presentation/rest/admin.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired
from backend.domain.constants import UserRole
from backend.domain.employees import (
    Employee,
    EmployeeCreateRequestBody,
    EmployeeRepository,
    EmployeeUncommited,
)
from backend.domain.employees.models import UserEmployee
from backend.domain.users import User, UserPublic, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.models import (
    Response,
    ResponseMulti,
)

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
) -> Response[UserEmployee]:
    """Creates an addition to the user, as for an employee"""

    employee: Employee = await EmployeeRepository().create(
        EmployeeUncommited(schema.dict())
    )

    employee_public = UserEmployee.from_orm(employee)

    return Response[UserEmployee](result=employee_public)


@router.get("/employee/get", status_code=status.HTTP_200_OK)
@transaction
async def employee_get(
    _: Request,
    user_employee_id: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> Response[UserEmployee]:
    """Get current employee by id masked by name in frontend"""

    user_employee: UserEmployee = await UsersRepository().get(
        key_="id", value_=user_employee_id
    )

    return Response[UserEmployee](result=user_employee)


@router.get("/employee/all", status_code=status.HTTP_200_OK)
@transaction
async def employee_get_all(
    _: Request,
    skip: int,
    limit: int,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> ResponseMulti[list[UserEmployee]]:
    """Get all employees"""

    user_employees: list[UserEmployee] = await EmployeeRepository().all(
        skip_=skip, limit_=limit
    )

    return ResponseMulti[list[UserEmployee]](result=user_employees)


@router.get("/employee/profession", status_code=status.HTTP_200_OK)
@transaction
async def employee_profession(
    _: Request,
    skip: int,
    limit: int,
    profession: str,
    user: User = Depends(RoleRequired(UserRole.ADMIN)),
) -> ResponseMulti[list[UserEmployee]]:
    """Get all employees by profession"""

    employees_by_profession: list[
        UserEmployee
    ] = await EmployeeRepository()._all_by(
        key_="profession", value_=profession, skip_=skip, limit_=limit
    )

    return ResponseMulti[list[UserEmployee]](result=employees_by_profession)


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

    # mesage = """
		# Employee isn`t active, status updated to False
		# """

    return Response[UserPublic](result=user)
