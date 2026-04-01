export default function TrafficResultCard({ result }) {
  if (!result) return null;

  const congestionColor =
    result.congestion_level === "Low"
      ? "text-green-400"
      : result.congestion_level === "Moderate"
      ? "text-yellow-400"
      : result.congestion_level === "High"
      ? "text-orange-400"
      : "text-red-400";

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 mt-6">
      <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-slate-400">Predicted Traffic Volume</p>
          <p className="text-3xl font-bold">{result.predicted_traffic_volume}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-slate-400">Congestion Level</p>
          <p className={`text-3xl font-bold ${congestionColor}`}>
            {result.congestion_level}
          </p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl md:col-span-2">
          <p className="text-slate-400">Traffic Alert</p>
          <p className="text-lg font-medium">{result.alert_message}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl md:col-span-2">
          <p className="text-slate-400">Best Travel Time Recommendation</p>
          <p className="text-lg font-medium">{result.recommended_travel_time}</p>
        </div>
      </div>
    </div>
  );
}