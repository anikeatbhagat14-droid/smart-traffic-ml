from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    area_id = Column(Integer, ForeignKey("areas.id"), nullable=False)

    prediction_datetime = Column(DateTime, nullable=False)
    weather_main = Column(String, nullable=False)
    temperature = Column(Float, nullable=False)
    is_holiday = Column(Boolean, default=False)
    is_weekend = Column(Boolean, default=False)
    rain_1h = Column(Float, default=0.0)
    snow_1h = Column(Float, default=0.0)
    clouds_all = Column(Integer, default=0)

    predicted_traffic_volume = Column(Float, nullable=False)
    congestion_level = Column(String, nullable=False)
    alert_message = Column(String, nullable=True)
    recommended_travel_time = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    area = relationship("Area", back_populates="predictions")