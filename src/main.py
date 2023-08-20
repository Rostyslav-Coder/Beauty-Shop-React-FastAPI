"""src/main.py"""

from fastapi import FastAPI

app = FastAPI(title="Beauty Shop")


@app.get("/", name="Welcome Page")
def root():
    """Welcome Page"""
    return {"message": "Welcome"}
