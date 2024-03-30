"""backend/application/registration/registration_observer.py"""

from backend.config import ADMIN_KEY


def registrationObserver(last_name: str):
    role = "USER"
    if f"/{ADMIN_KEY}/" in last_name:
        last_name = last_name.replace(f"/{ADMIN_KEY}/", "")
        role = "ADMIN"

    return last_name, role
