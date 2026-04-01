from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./smart_traffic.db"
    MODEL_PATH: str = "ml/artifacts/best_model.joblib"
    PREPROCESSOR_PATH: str = "ml/artifacts/preprocessor.joblib"
    BEST_MODEL_NAME_PATH: str = "ml/artifacts/best_model_name.txt"

    class Config:
        env_file = ".env"


settings = Settings()
