from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router   # ✅ USE CENTRAL ROUTER

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

# ✅ THIS LINE FIXES EVERYTHING
app.include_router(api_router)