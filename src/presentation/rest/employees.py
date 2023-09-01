"""src/presentation/rest/employees.py"""

from fastapi import APIRouter, Depends, Request, status

from src.application.authentication import RoleRequired
from src.domain.constants import UserRole
from src.domain.employees import EmployeeCreateRequestBody, EmployeePublic
from src.domain.users import User
from src.infrastructure.database import transaction

# from src.infrastructure.errors import AuthorizationError
from src.infrastructure.models import Response  # ResponseMulti

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def employee_create(
    _: Request,
    employee: EmployeeCreateRequestBody,
    user: User = Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[EmployeePublic]:
    ...
