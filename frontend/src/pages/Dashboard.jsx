import { useEffect, useState } from "react";
import { getAnalyticsSummary, getPeakHours } from "../api/trafficApi";
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
  const [peakData, setPeakData] = useState([]);

  useEffect(() => {
    getAnalyticsSummary()
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Summary fetch failed:", err));

    getPeakHours()
      .then((res) => {
        console.log("Peak Hours API Data:", res.data);

        const formattedData = res.data.map((item) => ({
          hour: String(item.hour),
          avg_traffic: Number(item.avg_traffic),
        }));

        setPeakData(formattedData);
      })
      .catch((err) => console.error("Peak Hours fetch failed:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold mb-4">
            📊 Traffic Analytics Dashboard
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Explore prediction statistics, busiest zones, and peak-hour traffic
            patterns.
          </p>
        </div>

        {/* Stat Cards */}
        {summary && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            <StatCard title="Total Predictions" value={summary.total_predictions} />
            <StatCard
              title="Average Traffic"
              value={summary.average_predicted_traffic?.toFixed(2)}
            />
            <StatCard title="Busiest Area" value={summary.busiest_area} />
            <StatCard title="Peak Hour" value={summary.peak_hour} />
          </div>
        )}

        {/* Chart Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">📈 Peak Hour Traffic Trend</h2>

          {peakData.length > 0 ? (
            <div className="w-full h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={peakData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="hour" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avg_traffic"
                    stroke="#60a5fa"
                    strokeWidth={4}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-slate-400 text-lg">Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  );
}