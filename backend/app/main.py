from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.predictions import router as predictions_router
from app.api.routes.locations import router as locations_router

app = FastAPI(title="Smart Traffic Flow Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Smart Traffic Flow Prediction API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

# Register routes
app.include_router(predictions_router, prefix="/predictions", tags=["Predictions"])
app.include_router(locations_router, prefix="/locations", tags=["Locations"])