import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getHealth = () => API.get("/health");
export const predictTraffic = (payload) => API.post("/predictions/predict", payload);
export const getHistory = () => API.get("/predictions/history");
export const getAnalyticsSummary = () => API.get("/analytics/summary");
export const getPeakHours = () => API.get("/analytics/peak-hours");
export const getLocations = () => API.get("/locations/");