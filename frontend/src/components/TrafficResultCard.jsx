export default function TrafficResultCard({ result }) {
  if (!result) return null;

  const congestionColor =
    result.congestion_level === "Low"
      ? "text-green-400"
      : result.congestion_level === "Moderate"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Prediction Result
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 rounded-2xl p-5">
          <p className="text-slate-400 text-sm mb-1">Predicted Traffic Volume</p>
          <p className="text-4xl font-bold text-blue-400">
            {Number(result.predicted_traffic_volume).toFixed(2)}
          </p>
        </div>

        <div className="bg-slate-900/70 rounded-2xl p-5">
          <p className="text-slate-400 text-sm mb-1">Congestion Level</p>
          <p className={`text-4xl font-bold ${congestionColor}`}>
            {result.congestion_level}
          </p>
        </div>

        <div className="bg-slate-900/70 rounded-2xl p-5 md:col-span-2">
          <p className="text-slate-400 text-sm mb-1">Alert Message</p>
          <p className="text-lg font-medium text-white">{result.alert_message}</p>
        </div>

        <div className="bg-slate-900/70 rounded-2xl p-5 md:col-span-2">
          <p className="text-slate-400 text-sm mb-1">Recommended Travel Time</p>
          <p className="text-lg font-medium text-white">
            {result.recommended_travel_time}
          </p>
        </div>
      </div>
    </div>
  );
}