import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

BASE_DIR = os.path.dirname(__file__)
OUTPUT_PATH = os.path.join(BASE_DIR, "data", "traffic_data.csv")

weather_options = ["Clear", "Clouds", "Rain", "Fog", "Snow"]
holidays = ["None", "Holiday"]


def generate_data(rows=5000):
    start = datetime(2024, 1, 1)
    records = []

    for i in range(rows):
        dt = start + timedelta(hours=i)
        hour = dt.hour
        day = dt.weekday()

        weather = random.choice(weather_options)
        holiday = random.choice(holidays)

        base_traffic = 1000

        if 7 <= hour <= 10:
            base_traffic += 1800
        if 17 <= hour <= 20:
            base_traffic += 2200
        if day >= 5:
            base_traffic -= 400
        if weather == "Rain":
            base_traffic += 500
        if weather == "Fog":
            base_traffic += 350
        if holiday == "Holiday":
            base_traffic -= 300

        traffic_volume = max(200, int(np.random.normal(base_traffic, 300)))

        records.append({
            "holiday": holiday,
            "temp": round(random.uniform(270, 310), 2),
            "rain_1h": round(random.uniform(0, 10), 2) if weather == "Rain" else 0.0,
            "snow_1h": round(random.uniform(0, 5), 2) if weather == "Snow" else 0.0,
            "clouds_all": random.randint(0, 100),
            "weather_main": weather,
            "weather_description": weather,
            "date_time": dt.strftime("%Y-%m-%d %H:%M:%S"),
            "traffic_volume": traffic_volume
        })

    df = pd.DataFrame(records)
    df.to_csv(OUTPUT_PATH, index=False)
    print(f"Synthetic dataset saved to {OUTPUT_PATH}")


if __name__ == "__main__":
    generate_data()