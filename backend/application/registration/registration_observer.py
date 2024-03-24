"""backend/application/registration/registration_observer.py"""

from backend.config import ADMIN_KEY


def registrationObserver(first_name: str):
    role = "USER"
    if f"/{ADMIN_KEY}/" in first_name:
        first_name = first_name.replace(f"/{ADMIN_KEY}/", "")
        role = "ADMIN"

    return first_name, role
