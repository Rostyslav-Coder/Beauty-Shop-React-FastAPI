# """src/main.py"""

# from fastapi import FastAPI

# from src.employees.routers import router as employee_router
# from src.users.base_config import auth_backend, fastapi_users
# from src.users.routers import router as user_router
# from src.users.schemas import UserCreate, UserRead, UserUpdate

# app = FastAPI(title="Beauty Shop")


# @app.get("/", name="Welcome Page")
# def root():
#     """Welcome Page"""
#     return {"message": "Welcome"}


# app.include_router(
#     fastapi_users.get_register_router(UserRead, UserCreate),
#     prefix="",
#     tags=["auth"],
# )

# app.include_router(
#     fastapi_users.get_auth_router(auth_backend),
#     prefix="/jwt",
#     tags=["auth"],
# )

# app.include_router(
#     fastapi_users.get_verify_router(UserRead),
#     prefix="/auth",
#     tags=["auth"],
# )

# app.include_router(
#     fastapi_users.get_users_router(UserRead, UserUpdate),
#     prefix="/users",
#     tags=["users"],
# )

# app.include_router(user_router, prefix="/users", tags=["auth"])
# app.include_router(employee_router, prefix="/employee", tags=["employee"])
