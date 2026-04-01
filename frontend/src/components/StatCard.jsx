export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-700">
      <h3 className="text-slate-300 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      {subtitle && <p className="text-slate-400 text-sm mt-2">{subtitle}</p>}
    </div>
  );
}