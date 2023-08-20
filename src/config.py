"""src/config.py"""

import os

from dotenv import load_dotenv

load_dotenv()


DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")

MANAGER_PASS_SECRET = os.environ.get("MANAGER_PASS_SECRET")
MANAGER_VERIF_SECRET = os.environ.get("MANAGER_VERIF_SECRET")
AUTH_SECRET = os.environ.get("AUTH_SECRET")
