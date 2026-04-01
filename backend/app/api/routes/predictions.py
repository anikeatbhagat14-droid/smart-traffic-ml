from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from app.services.model_service import predict_traffic_ml

router = APIRouter()

# Temporary in-memory history
prediction_history = []


class PredictionRequest(BaseModel):
    area_name: str
    prediction_datetime: datetime
    weather_main: str
    temperature: float
    is_holiday: bool
    rain_1h: float
    snow_1h: float
    clouds_all: int


@router.post("/predict")
def predict_traffic(data: PredictionRequest):
    input_data = data.dict()

    predicted_traffic = predict_traffic_ml(input_data)

    if predicted_traffic < 1000:
        congestion = "Low"
        alert = "Traffic is smooth."
        recommendation = "You can travel anytime."
    elif predicted_traffic < 1800:
        congestion = "Moderate"
        alert = "Moderate traffic expected."
        recommendation = "Travel slightly earlier if possible."
    elif predicted_traffic < 2400:
        congestion = "High"
        alert = "Heavy traffic expected."
        recommendation = "Avoid peak rush hour if possible."
    else:
        congestion = "Severe"
        alert = "Severe congestion likely."
        recommendation = "Travel before or after peak time."

    response = {
        "id": len(prediction_history) + 1,
        "area_name": data.area_name,
        "prediction_datetime": data.prediction_datetime,
        "weather_main": data.weather_main,
        "temperature": data.temperature,
        "predicted_traffic_volume": predicted_traffic,
        "congestion_level": congestion,
        "alert_message": alert,
        "recommended_travel_time": recommendation,
    }

    prediction_history.append(response)
    return response


@router.get("/history")
def get_history():
    return prediction_history