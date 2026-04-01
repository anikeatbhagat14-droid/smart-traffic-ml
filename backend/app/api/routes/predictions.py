from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import random

router = APIRouter()

# Temporary in-memory history
prediction_history = []

class PredictionRequest(BaseModel):
    area_name: str
    prediction_datetime: datetime
    weather_main: str
    temperature: float
    is_holiday: bool = False
    rain_1h: float = 0.0
    snow_1h: float = 0.0
    clouds_all: int = 0

@router.post("/predict")
def predict_traffic(data: PredictionRequest):
    # Dummy traffic prediction logic
    base = 2000

    if data.weather_main.lower() in ["rain", "drizzle", "thunderstorm"]:
        base += 500
    if data.weather_main.lower() in ["snow"]:
        base += 700
    if data.temperature > 35:
        base += 200
    if data.is_holiday:
        base -= 300
    if data.clouds_all > 70:
        base += 150

    predicted_traffic_volume = base + random.randint(-300, 300)

    if predicted_traffic_volume < 2200:
        congestion_level = "Low"
        alert_message = "Traffic is smooth."
        recommended_travel_time = "Best time to travel now."
    elif predicted_traffic_volume < 2700:
        congestion_level = "Moderate"
        alert_message = "Moderate congestion expected."
        recommended_travel_time = "Travel with slight delay."
    else:
        congestion_level = "High"
        alert_message = "Heavy congestion expected!"
        recommended_travel_time = "Avoid peak time if possible."

    result = {
        "area_name": data.area_name,
        "prediction_datetime": data.prediction_datetime.isoformat(),
        "weather_main": data.weather_main,
        "temperature": data.temperature,
        "predicted_traffic_volume": predicted_traffic_volume,
        "congestion_level": congestion_level,
        "alert_message": alert_message,
        "recommended_travel_time": recommended_travel_time,
    }

    prediction_history.append(result)

    return {
        "predicted_traffic_volume": predicted_traffic_volume,
        "congestion_level": congestion_level,
        "alert_message": alert_message,
        "recommended_travel_time": recommended_travel_time,
    }

@router.get("/history")
def get_prediction_history():
    return prediction_history