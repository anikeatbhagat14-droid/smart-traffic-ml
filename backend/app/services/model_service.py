import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "artifacts", "best_model.joblib")


def load_model():
    return joblib.load(MODEL_PATH)


def prepare_features(data):
    dt = pd.to_datetime(data["prediction_datetime"])

    features = pd.DataFrame([{
        "holiday": "Holiday" if data["is_holiday"] else "None",
        "temp": data["temperature"],
        "rain_1h": data["rain_1h"],
        "snow_1h": data["snow_1h"],
        "clouds_all": data["clouds_all"],
        "weather_main": data["weather_main"],
        "hour": dt.hour,
        "day": dt.day,
        "month": dt.month,
        "weekday": dt.weekday(),
    }])

    return features


def predict_traffic_ml(data):
    model = load_model()
    features = prepare_features(data)
    prediction = model.predict(features)[0]
    return max(0, round(float(prediction), 2))