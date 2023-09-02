"""src/presentation/rest/employees.py"""

from fastapi import APIRouter, Depends, Request, status

from src.application.authentication import RoleRequired
from src.domain.constants import UserRole
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
