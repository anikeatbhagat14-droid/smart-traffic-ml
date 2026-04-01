from fastapi import APIRouter

router = APIRouter(prefix="/locations", tags=["Locations"])

@router.get("/")
def get_locations():
    return [
        {"id": 1, "area_name": "Industrial Area"},
        {"id": 2, "area_name": "City Center"},
        {"id": 3, "area_name": "Residential Zone"},
        {"id": 4, "area_name": "Highway Junction"},
        {"id": 5, "area_name": "Market Area"},
        {"id": 6, "area_name": "Airport Road"},
        {"id": 7, "area_name": "Railway Station"},
        {"id": 8, "area_name": "School Zone"},
        {"id": 9, "area_name": "Hospital Area"},
        {"id": 10, "area_name": "Bus Stand"},
    ]