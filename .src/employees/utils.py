# """src/ticket/utils.py"""

# from fastapi import Depends, HTTPException

# from src.users.base_config import current_user
# from src.users.models import User
# from src.users.schemas import UserInside

# print(UserInside.is_employee)


# class EmployeeRequired:
#     def __init__(self, is_employee: UserInside.is_employee):
#         self.is_employee = is_employee

#     async def __call__(self, user: User = Depends(current_user)):
#         if user.is_employee != self.is_employee:
#             raise HTTPException(status_code=403, detail="Forbidden")
#         return user
