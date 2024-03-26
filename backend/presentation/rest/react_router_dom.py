"""backend/presentation/rest/root_router.py"""

from fastapi import APIRouter, Request, status
from fastapi.responses import HTMLResponse
from starlette.responses import FileResponse

router = APIRouter()


@router.get("/")
async def root():
    return FileResponse("dist/index.html")


@router.get("/about", status_code=status.HTTP_200_OK)
async def about_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/services", status_code=status.HTTP_200_OK)
async def services_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/employees", status_code=status.HTTP_200_OK)
async def employees_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/contact", status_code=status.HTTP_200_OK)
async def contact_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/registration", status_code=status.HTTP_200_OK)
async def registration_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/authentication", status_code=status.HTTP_200_OK)
async def authentication_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/orders", status_code=status.HTTP_200_OK)
async def orders_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/employee", status_code=status.HTTP_200_OK)
async def employee_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )


@router.get("/admin", status_code=status.HTTP_200_OK)
async def admin_page(
    _: Request,
):
    return HTMLResponse(
        content=open("dist/index.html").read(), status_code=200
    )
