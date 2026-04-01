export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-16">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          🚦 Smart Traffic Flow
          <span className="text-blue-400"> Prediction System</span>
        </h1>

        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-8">
          Predict traffic congestion using machine learning based on time,
          weather, and road conditions. Get smart alerts and optimize your
          travel decisions.
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">📊 ML Prediction</h3>
          <p className="text-slate-300">
            Predict traffic flow using trained machine learning models with high accuracy.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">🚨 Congestion Alerts</h3>
          <p className="text-slate-300">
            Get instant traffic congestion levels and real-time travel suggestions.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">📈 Analytics Dashboard</h3>
          <p className="text-slate-300">
            Visualize peak traffic hours, busiest zones, and traffic patterns.
          </p>
        </div>

      </div>

      {/* CALL TO ACTION */}
      <div className="text-center mt-20">
        <a
          href="/predict"
          className="inline-block bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition"
        >
          🚀 Try Prediction Now
        </a>
      </div>

    </div>
  );
}