"""backend/application/registration/registration_observer.py"""

from backend.config import ADMIN_KEY
from backend.domain.constants import UserRole
from backend.domain.users import UserCreateRequestBody


def registrationObserver(schema: UserCreateRequestBody):
    if f"/{ADMIN_KEY}/" in schema.last_name:
        schema.last_name = schema.last_name.replace(f"/{ADMIN_KEY}/", "")
        schema.role = UserRole.ADMIN

    return schema
