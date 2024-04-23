"""
backend/presentation/rest/employees.py

This module contains all employee routes.
"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import get_current_user
from backend.domain.constants import UserRole
from backend.domain.employees import (
    Employee,
    EmployeeCreateRequestBody,
    EmployeeRepository,
    EmployeeUncommited,
    UserEmployeeProf,
    UserEmployeeProfPublic,
)
from backend.domain.users import User, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/employees", tags=["Route for managing employees"])


#! Validated endpoint
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def employee_create(
    _: Request,
    schema: EmployeeCreateRequestBody,
    user: User = Depends(get_current_user),
) -> Response[UserEmployeeProfPublic]:
    """Creates an addition to the user, as for an employee"""

    # Only admin can create employee
    if user.role != "ADMIN":
        raise AuthenticationError

    # Update user role
    await UsersRepository().update(
        key_="id", value_=schema.user_id, payload_={"role": UserRole.EMPLOYEE}
    )

    # Create the Employee object
    employee: Employee = await EmployeeRepository().create(
        EmployeeUncommited(**schema.dict())
    )

    # Get fool employee representation from the database
    user_employee_prof: UserEmployeeProf = await EmployeeRepository().get(
        key_="id", value_=employee.id
    )
    user_employee_prof_public = UserEmployeeProfPublic.from_orm(
        user_employee_prof
    )

    return Response[UserEmployeeProfPublic](result=user_employee_prof_public)


#! Validated endpoint
@router.get("/info", status_code=status.HTTP_200_OK)
@transaction
async def employee_info(
    _: Request, employee_name: str, user: User = Depends(get_current_user)
) -> Response[UserEmployeeProfPublic]:
    """Get Employee Info"""

    # Only admin can create employee
    if user.role != "ADMIN":
        raise AuthenticationError

    # Get the associated user from the database
    user_employee: User = await UsersRepository().get(
        key_="first_name", value_=employee_name
    )

    # Get the associated employee from the database
    employee: UserEmployeeProf = await EmployeeRepository().get(
        key_="user_id", value_=user_employee.id
    )
    employee_public = UserEmployeeProfPublic.from_orm(employee)

    return Response[UserEmployeeProfPublic](result=employee_public)


#! Validated endpoint
@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def employees_all(
    _: Request, skip: int, limit: int, user: User = Depends(get_current_user)
) -> ResponseMulti[UserEmployeeProfPublic]:
    """Get All Employees"""

    # Only admin can create employee
    if user.role != "ADMIN":
        raise AuthenticationError

    # Get employees list from database
    employees: list[UserEmployeeProf] = await EmployeeRepository().all(
        skip_=skip, limit_=limit
    )
    employees_public = [
        UserEmployeeProfPublic.from_orm(employee) for employee in employees
    ]

    return ResponseMulti[UserEmployeeProfPublic](result=employees_public)


#! Validated endpoint
@router.get("/profession", status_code=status.HTTP_200_OK)
@transaction
async def employees_by_profession(
    _: Request,
    skip: int,
    limit: int,
    profession_id: int,
    user: User = Depends(get_current_user),
) -> ResponseMulti[UserEmployeeProfPublic]:
    """Get All Employees by profession"""

    # Only admin can create employee
    if user.role != "ADMIN":
        raise AuthenticationError

    # Get employees list from database
    employees: list[UserEmployeeProf] = await EmployeeRepository().all_by(
        key_="profession_id", value_=profession_id, skip_=skip, limit_=limit
    )
    employees_public = [
        UserEmployeeProfPublic.from_orm(employee) for employee in employees
    ]

    return ResponseMulti[UserEmployeeProfPublic](result=employees_public)


#! Validated endpoint
@router.get("/me", status_code=status.HTTP_200_OK)
@transaction
async def employee_me(
    _: Request, user: User = Depends(get_current_user)
) -> Response[UserEmployeeProfPublic]:
    """Get Employee Details"""

    # Only employee can get his details
    if user.role != "EMPLOYEE":
        raise AuthenticationError

    # Get the current employee from the database
    employee: UserEmployeeProf = await EmployeeRepository().get(
        key_="user_id", value_=user.id
    )
    employee_public = UserEmployeeProfPublic.from_orm(employee)

    return Response[UserEmployeeProfPublic](result=employee_public)
