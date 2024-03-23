"""src/presentation/rest/root_router.py"""

from fastapi import APIRouter
from starlette.responses import FileResponse

router = APIRouter()


@router.get("/")
async def root():
		return FileResponse("dist/index.html")
