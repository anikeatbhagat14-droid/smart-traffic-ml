import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../api/trafficApi";
import StatCard from "../components/StatCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getAnalyticsSummary()
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Analytics fetch error:", err));
  }, []);

  const chartData = summary?.peak_hours || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">📊 Traffic Analytics Dashboard</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Explore prediction statistics, busiest zones, and peak-hour traffic patterns.
          </p>
        </div>

        {summary ? (
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <StatCard
                title="Total Predictions"
                value={summary.total_predictions ?? 0}
              />
              <StatCard
                title="Average Traffic"
                value={summary.average_predicted_traffic?.toFixed(2) ?? "0.00"}
              />
              <StatCard
                title="Busiest Area"
                value={summary.busiest_area ?? "N/A"}
              />
              <StatCard
                title="Peak Hour"
                value={summary.peak_hour ?? "N/A"}
              />
            </div>

            {/* Chart */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">📈 Peak Hour Traffic Trend</h2>

              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="hour" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avg_traffic"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-center text-slate-400">Loading dashboard...</p>
        )}
      </div>
    </div>
  );
}