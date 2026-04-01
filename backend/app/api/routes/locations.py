from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_locations():
    return [
        {"id": 1, "area_name": "Industrial Area"},
        {"id": 2, "area_name": "City Center"},
        {"id": 3, "area_name": "Highway Junction"},
        {"id": 4, "area_name": "Residential Zone"},
        {"id": 5, "area_name": "Airport Road"},
    ]