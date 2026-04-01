import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItem = (to, label, icon) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        className={`group relative px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 border ${
          active
            ? "bg-blue-600/90 text-white border-blue-400 shadow-lg shadow-blue-500/20"
            : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-white/20"
        }`}
      >
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{label}</span>
        </span>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl shadow-lg">
            🚦
          </div>
          <div>
            <h1 className="text-white font-extrabold text-xl tracking-wide">
              Smart Traffic ML
            </h1>
            <p className="text-slate-400 text-sm">
              Prediction & Congestion Intelligence
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {navItem("/", "Home", "🏠")}
          {navItem("/predict", "Predict", "🧠")}
          {navItem("/dashboard", "Dashboard", "📊")}
          {navItem("/history", "History", "🕘")}
        </div>
      </div>
    </nav>
  );
}