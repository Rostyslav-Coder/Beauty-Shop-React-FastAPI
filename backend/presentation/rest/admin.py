"""backend/presentation/rest/admin.py"""

from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Administration"])
