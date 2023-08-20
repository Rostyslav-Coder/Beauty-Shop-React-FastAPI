"""src/users/routers.py"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import APIKeyHeader
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import EMPLOYEE_SECRET
from src.database import get_async_session
from src.users.base_config import current_active_verified_user
from src.users.models import User

api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)


router = APIRouter()


@router.put("/is_employee")
async def update_is_employee(
    secret: str,
    user: User = Depends(current_active_verified_user),
    session: AsyncSession = Depends(get_async_session),
):
    if secret != EMPLOYEE_SECRET:
        raise HTTPException(status_code=400, detail="Incorrect data")
    user.is_employee = True
    session.add(user)
    await session.commit()
    return {"message": "User is_employee updated successfully"}
