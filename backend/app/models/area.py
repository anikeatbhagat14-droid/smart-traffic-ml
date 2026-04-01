from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base


class Area(Base):
    __tablename__ = "areas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    road_type = Column(String, nullable=True)
    region = Column(String, nullable=True)

    predictions = relationship("Prediction", back_populates="area")
    traffic_records = relationship("TrafficRecord", back_populates="area")