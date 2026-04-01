from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.predictions import router as predictions_router
from app.api.routes.analytics import router as analytics_router
from app.api.routes.locations import router as locations_router
from app.api.routes.train import router as train_router

api_router = APIRouter()

api_router.include_router(health_router, tags=["Health"])
api_router.include_router(predictions_router, prefix="/predictions", tags=["Predictions"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(locations_router, prefix="/locations", tags=["Locations"])
api_router.include_router(train_router, prefix="/train", tags=["Training"])