"""backend/presentation/rest/users.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import (
    create_access_token,
    get_current_user,
)
from backend.application.registration import registrationObserver
from backend.config import pwd_context, settings
from backend.domain.users import (
    User,
    UserCreateRequestBody,
    UserPublic,
    UsersRepository,
    UserUncommited,
)
from backend.infrastructure.database import transaction
from backend.infrastructure.models import Response  # ResponseMulti

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
@transaction
async def user_create(
    _: Request,
    schema: UserCreateRequestBody,
    # ) -> Response[UserPublic]:
):
    """Create new user."""

    # Password hashing
    hashed_password = pwd_context.hash(schema.password)
    schema.password = hashed_password

    # Role definition
    schema.first_name, role = registrationObserver(schema.first_name)

    # Save new user to the database
    user: User = await UsersRepository().create(
        UserUncommited(**schema.dict(), role=role)
    )

    # Atomaticali logining the user
    access_token = create_access_token(data={"sub": str(user.id)})
    token = {
        "access_token": access_token,
        "token_type": settings.authentication.schema,
    }

    user_public = UserPublic.from_orm(user)

    # return Response[UserPublic](result=user_public)
    return {
        "user": user_public,
        "token": token,
        "token_type": settings.authentication.scheme,
    }


@router.get("/me", status_code=status.HTTP_200_OK)
@transaction
async def user_me(
    _: Request,
    current_user: User = Depends(get_current_user),
) -> Response[UserPublic]:
    """Get current aythenticate user by JWT token"""

    # Get user by JWT from database
    user: User = await UsersRepository().get(key_="id", value_=current_user.id)
    user_public = UserPublic.from_orm(user)

    return Response[UserPublic](result=user_public)
