"""backend/presentation/rest/authentication.py"""

from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from backend.application.authentication import create_access_token
from backend.config import settings
from backend.domain.users import User, UserPublic, UsersRepository
from backend.infrastructure.errors import NotFoundError

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticate user"""

    # Get user from the database by email in place of username
    email = form_data.username
    user: User = await UsersRepository().get(key_="email", value_=email)

    if not user:
        raise NotFoundError

    user_public = UserPublic.from_orm(user)

    # Creating user token
    access_token = create_access_token(data={"sub": str(user.id)})

    return {
        "user": user_public,
        "access_token": access_token,
        "token_type": settings.authentication.scheme,
    }
