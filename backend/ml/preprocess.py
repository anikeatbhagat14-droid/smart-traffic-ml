import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer


def load_and_prepare_data(csv_path):
    df = pd.read_csv(csv_path)

    print("📄 Columns in dataset:", df.columns.tolist())

    # Convert datetime
    df["date_time"] = pd.to_datetime(df["date_time"])

    # Extract datetime features
    df["hour"] = df["date_time"].dt.hour
    df["day"] = df["date_time"].dt.day
    df["month"] = df["date_time"].dt.month
    df["weekday"] = df["date_time"].dt.weekday

    # Drop original datetime + unused text description
    df = df.drop(columns=["date_time", "weather_description"])

    target = "traffic_volume"
    X = df.drop(columns=[target])
    y = df[target]

    categorical_features = ["holiday", "weather_main"]
    numeric_features = [
        "temp",
        "rain_1h",
        "snow_1h",
        "clouds_all",
        "hour",
        "day",
        "month",
        "weekday",
    ]

    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ])

    numeric_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ])

    preprocessor = ColumnTransformer(transformers=[
        ("cat", categorical_transformer, categorical_features),
        ("num", numeric_transformer, numeric_features),
    ])

    return X, y, preprocessor