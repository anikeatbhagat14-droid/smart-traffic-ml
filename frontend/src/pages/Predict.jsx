import { useState } from "react";
import { predictTraffic } from "../api/trafficApi";

export default function Predict() {
  const [formData, setFormData] = useState({
    area_name: "City Center",
    prediction_datetime: "",
    weather_main: "Clear",
    temperature: 25,
    is_holiday: false,
    rain_1h: 0,
    snow_1h: 0,
    clouds_all: 20,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await predictTraffic(formData);
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4">🚗 Predict Traffic Flow</h1>
          <p className="text-slate-300 text-lg">
            Enter traffic conditions and get real-time ML-powered traffic predictions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl grid md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-2 text-slate-300">Area Name</label>
            <select
              name="area_name"
              value={formData.area_name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
            >
              <option>City Center</option>
              <option>Airport Road</option>
              <option>Railway Station</option>
              <option>Industrial Area</option>
              <option>Market Area</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">Date & Time</label>
            <input
              type="datetime-local"
              name="prediction_datetime"
              value={formData.prediction_datetime}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">Weather</label>
            <select
              name="weather_main"
              value={formData.weather_main}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
            >
              <option>Clear</option>
              <option>Clouds</option>
              <option>Rain</option>
              <option>Snow</option>
              <option>Mist</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">Rain in Last 1 Hour</label>
            <input
              type="number"
              name="rain_1h"
              value={formData.rain_1h}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">Snow in Last 1 Hour</label>
            <input
              type="number"
              name="snow_1h"
              value={formData.snow_1h}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">Cloud Coverage (%)</label>
            <input
              type="number"
              name="clouds_all"
              value={formData.clouds_all}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700"
            />
          </div>

          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              name="is_holiday"
              checked={formData.is_holiday}
              onChange={handleChange}
              className="mr-3 w-5 h-5"
            />
            <label className="text-slate-300">Is Holiday?</label>
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold text-lg transition"
            >
              {loading ? "Predicting..." : "Predict Traffic"}
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              🚦 Prediction Result
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-2xl">
                <p className="text-slate-400 text-sm mb-2">Traffic Volume</p>
                <h2 className="text-4xl font-bold text-blue-400">
                  {result.predicted_traffic_volume}
                </h2>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl">
                <p className="text-slate-400 text-sm mb-2">Congestion Level</p>
                <h2
                  className={`text-2xl font-bold ${
                    result.congestion_level === "Low"
                      ? "text-green-400"
                      : result.congestion_level === "Moderate"
                      ? "text-yellow-400"
                      : result.congestion_level === "High"
                      ? "text-orange-400"
                      : "text-red-400"
                  }`}
                >
                  {result.congestion_level}
                </h2>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl md:col-span-2">
                <p className="text-slate-400 text-sm mb-2">Alert</p>
                <p className="text-lg font-semibold text-white">
                  {result.alert_message}
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl md:col-span-2">
                <p className="text-slate-400 text-sm mb-2">Recommendation</p>
                <p className="text-lg font-semibold text-blue-300">
                  {result.recommended_travel_time}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}