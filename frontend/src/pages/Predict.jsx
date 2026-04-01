import { useEffect, useState } from "react";
import { predictTraffic, getLocations } from "../api/trafficApi";
import TrafficResultCard from "../components/TrafficResultCard";

export default function Predict() {
  const [locations, setLocations] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    area_name: "",
    prediction_datetime: "",
    weather_main: "Clear",
    temperature: 25,
    is_holiday: false,
    rain_1h: 0,
    snow_1h: 0,
    clouds_all: 0,
  });

  useEffect(() => {
    getLocations()
      .then((res) => {
        setLocations(res.data);
        if (res.data.length > 0) {
          setForm((prev) => ({
            ...prev,
            area_name: res.data[0].area_name,
          }));
        }
      })
      .catch((err) => console.error("Locations fetch error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.area_name || !form.prediction_datetime) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const payload = {
        ...form,
        prediction_datetime: new Date(form.prediction_datetime).toISOString(),
      };

      const res = await predictTraffic(payload);
      setResult(res.data);
    } catch (err) {
      console.error("Prediction error:", err?.response?.data || err.message);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">🚦 Traffic Prediction</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Enter traffic conditions and get instant ML-based congestion
            predictions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl grid md:grid-cols-2 gap-8"
        >
          {/* Area Name */}
          <div>
            <label className="block mb-2 text-slate-300">Area Name</label>
            <select
              name="area_name"
              value={form.area_name}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
              required
            >
              <option value="">Select Area</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.area_name}>
                  {loc.area_name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Time */}
          <div>
            <label className="block mb-2 text-slate-300">Date & Time</label>
            <input
              type="datetime-local"
              name="prediction_datetime"
              value={form.prediction_datetime}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
              required
            />
          </div>

          {/* Weather */}
          <div>
            <label className="block mb-2 text-slate-300">Weather</label>
            <select
              name="weather_main"
              value={form.weather_main}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
            >
              <option value="Clear">Clear</option>
              <option value="Clouds">Clouds</option>
              <option value="Rain">Rain</option>
              <option value="Snow">Snow</option>
              <option value="Drizzle">Drizzle</option>
              <option value="Mist">Mist</option>
              <option value="Fog">Fog</option>
              <option value="Thunderstorm">Thunderstorm</option>
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="block mb-2 text-slate-300">Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={form.temperature}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
            />
          </div>

          {/* Rain */}
          <div>
            <label className="block mb-2 text-slate-300">Rain in Last 1 Hour</label>
            <input
              type="number"
              name="rain_1h"
              value={form.rain_1h}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
            />
          </div>

          {/* Snow */}
          <div>
            <label className="block mb-2 text-slate-300">Snow in Last 1 Hour</label>
            <input
              type="number"
              name="snow_1h"
              value={form.snow_1h}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
            />
          </div>

          {/* Clouds */}
          <div>
            <label className="block mb-2 text-slate-300">Cloud Coverage (%)</label>
            <input
              type="number"
              name="clouds_all"
              value={form.clouds_all}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white"
            />
          </div>

          {/* Holiday */}
          <div className="flex items-center gap-4 mt-10">
            <input
              type="checkbox"
              name="is_holiday"
              checked={form.is_holiday}
              onChange={handleChange}
              className="w-6 h-6"
            />
            <label className="text-slate-300 text-lg">Is Holiday?</label>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-12 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-xl font-bold shadow-lg disabled:opacity-60"
            >
              {loading ? "Predicting..." : "Predict Traffic"}
            </button>
          </div>
        </form>

        {/* Result */}
        <TrafficResultCard result={result} />
      </div>
    </div>
  );
}