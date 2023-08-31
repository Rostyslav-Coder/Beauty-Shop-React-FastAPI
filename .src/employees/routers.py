"""src/employees/routers.py"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_async_session
from src.employees.schemas import EmployeeIn, EmployeeOut, ServiceRead
from src.employees.utils import EmployeeRequired
from src.users.schemas import UserRead


router = APIRouter()


@router.post("/create", response_model=EmployeeOut)
async def employee_create(
    employee: EmployeeIn,
    user = Depends(EmployeeRequired),
    session: AsyncSession = Depends(get_async_session),
):
    pass
