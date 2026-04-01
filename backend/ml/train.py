import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from preprocess import load_and_prepare_data


BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "data", "traffic_data.csv")
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

os.makedirs(ARTIFACTS_DIR, exist_ok=True)


def main():
    print("🚀 Starting model training...")

    X, y, preprocessor = load_and_prepare_data(DATA_PATH)

    print("✅ Data loaded successfully")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    models = {
        "Ridge": Ridge(),
        "RandomForest": RandomForestRegressor(n_estimators=100, random_state=42),
        "GradientBoosting": GradientBoostingRegressor(random_state=42),
    }

    results = []
    best_model = None
    best_model_name = None
    best_score = -9999

    for name, regressor in models.items():
        print(f"🔍 Training {name}...")

        pipeline = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("model", regressor),
        ])

        pipeline.fit(X_train, y_train)
        preds = pipeline.predict(X_test)

        mae = mean_absolute_error(y_test, preds)
        rmse = mean_squared_error(y_test, preds) ** 0.5
        r2 = r2_score(y_test, preds)

        results.append((name, mae, rmse, r2))
        print(f"{name} -> MAE: {mae:.2f}, RMSE: {rmse:.2f}, R2: {r2:.4f}")

        if r2 > best_score:
            best_score = r2
            best_model = pipeline
            best_model_name = name

    joblib.dump(best_model, os.path.join(ARTIFACTS_DIR, "best_model.joblib"))

    with open(os.path.join(ARTIFACTS_DIR, "best_model_name.txt"), "w") as f:
        f.write(best_model_name)

    results_df = pd.DataFrame(results, columns=["model_name", "mae", "rmse", "r2_score"])
    results_df["is_best"] = results_df["model_name"] == best_model_name
    results_df.to_csv(os.path.join(ARTIFACTS_DIR, "model_metrics.csv"), index=False)

    print(f"\n✅ Best model saved: {best_model_name}")
    print("🎉 Training complete.")


if __name__ == "__main__":
    main()