export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition">
      <h3 className="text-slate-400 text-sm mb-2">{title}</h3>
      <p className="text-4xl font-bold text-white">{value}</p>
      {subtitle && <p className="text-slate-400 text-sm mt-2">{subtitle}</p>}
    </div>
  );
}