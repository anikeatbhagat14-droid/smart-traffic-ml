import { useEffect, useState } from "react";
import { getHistory } from "../api/trafficApi";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory()
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            🕘 Prediction History
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            View past traffic predictions, congestion levels, and insights.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-slate-950/80 border-b border-white/10">
              <tr>
                <th className="p-4 text-slate-300">Area</th>
                <th className="p-4 text-slate-300">Date & Time</th>
                <th className="p-4 text-slate-300">Weather</th>
                <th className="p-4 text-slate-300">Temp</th>
                <th className="p-4 text-slate-300">Traffic</th>
                <th className="p-4 text-slate-300">Congestion</th>
              </tr>
            </thead>

            <tbody>
              {history.length > 0 ? (
                history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4">{item.area_name}</td>
                    <td className="p-4">
                      {new Date(item.prediction_datetime).toLocaleString()}
                    </td>
                    <td className="p-4">{item.weather_main}</td>
                    <td className="p-4">{item.temperature} °C</td>
                    <td className="p-4 font-semibold">
                      {item.predicted_traffic_volume}
                    </td>
                    <td
                      className={`p-4 font-bold ${
                        item.congestion_level === "Low"
                          ? "text-green-400"
                          : item.congestion_level === "Moderate"
                          ? "text-yellow-400"
                          : item.congestion_level === "High"
                          ? "text-orange-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.congestion_level}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-slate-400">
                    No predictions yet. Try making one!
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}