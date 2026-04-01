from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def trigger_training():
    return {
        "status": "success",
        "message": "Training endpoint placeholder. Model training is currently run manually."
    }