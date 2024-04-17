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
    EmployeeWithProfession,
    EmployeeWithProfessionPublic,
)
from backend.domain.users import User, UsersRepository
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import AuthenticationError
from backend.infrastructure.models import Response

router = APIRouter(prefix="/employees", tags=["Route for managing employees"])


#! Validated endpoint
@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def employee_create(
    _: Request,
    schema: EmployeeCreateRequestBody,
    user: User = Depends(get_current_user),
) -> Response[EmployeeWithProfessionPublic]:
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
    employee_prof: EmployeeWithProfession = await EmployeeRepository().get(
        key_="id", value_=employee.id
    )
    employee_public = EmployeeWithProfessionPublic.from_orm(employee_prof)

    return Response[EmployeeWithProfessionPublic](result=employee_public)
