from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_locations():
    return [
        {"id": 1, "name": "City Center"},
        {"id": 2, "name": "Airport Road"},
        {"id": 3, "name": "Railway Station"},
        {"id": 4, "name": "University Area"},
        {"id": 5, "name": "Industrial Zone"},
    ]