import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-traffic-backend-1dss.onrender.com",
});

export const predictTraffic = (data) => API.post("/predictions/predict", data);
export const getLocations = () => API.get("/locations/");
export const getAnalyticsSummary = () => API.get("/analytics/summary");
export const getPeakHours = () => API.get("/analytics/peak-hours");
export const getPredictionHistory = () => API.get("/predictions/history");