from fastapi import APIRouter

router = APIRouter()

@router.get("/summary")
def analytics_summary():
    return {
        "total_predictions": 25,
        "average_predicted_traffic": 1820,
        "busiest_area": "City Center",
        "peak_hour": 18
    }

@router.get("/peak-hours")
def peak_hours():
    return [
        {"hour": "6", "avg_traffic": 500},
        {"hour": "7", "avg_traffic": 900},
        {"hour": "8", "avg_traffic": 1400},
        {"hour": "9", "avg_traffic": 1200},
        {"hour": "10", "avg_traffic": 800},
        {"hour": "11", "avg_traffic": 700},
        {"hour": "12", "avg_traffic": 1000},
        {"hour": "13", "avg_traffic": 1100},
        {"hour": "14", "avg_traffic": 950},
        {"hour": "15", "avg_traffic": 1050},
        {"hour": "16", "avg_traffic": 1500},
        {"hour": "17", "avg_traffic": 1800},
        {"hour": "18", "avg_traffic": 2200},
        {"hour": "19", "avg_traffic": 1900},
        {"hour": "20", "avg_traffic": 1300},
        {"hour": "21", "avg_traffic": 800},
    ]