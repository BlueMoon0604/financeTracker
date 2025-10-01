import React from "react";

export default function Home({ onGetStarted }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-14 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-400">Take control</span>
            <br />
            <span className="text-white">of your money</span>
          </h2>
          <p className="mt-5 text-gray-300 max-w-prose">
            Track income and expenses, visualize trends, and stay on top of your goals. Simple, fast, and private.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onGetStarted} className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow">
              Get started
            </button>
            <a href="#features" className="px-5 py-3 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 font-semibold shadow inline-flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <ul className="mt-6 space-y-2 text-gray-300">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Real-time charts and insights</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-400" /> Category breakdowns</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-violet-400" /> Export your data anytime</li>
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-3xl overflow-hidden ring-1 ring-gray-800 shadow-2xl">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.12),transparent_40%)]" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl bg-gradient-to-br from-sky-500 to-emerald-500 blur-2xl opacity-30" />
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-2xl opacity-30" />
        </div>
      </div>

      <div id="features" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Visual insights", desc: "Interactive charts for income, expense and categories.", color: "from-sky-500 to-cyan-400", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="2"/><path d="M7 15l3-3 3 2 4-5" stroke="currentColor" strokeWidth="2"/></svg>
          )},
          { title: "Fast tracking", desc: "Add transactions quickly with smart defaults.", color: "from-emerald-500 to-teal-400", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"/></svg>
          )},
          { title: "Your data", desc: "Export CSV anytime. Data stays on your device.", color: "from-violet-500 to-fuchsia-500", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2"/></svg>
          )},
        ].map((f) => (
          <div key={f.title} className="rounded-2xl p-5 bg-gray-900/70 ring-1 ring-gray-800 shadow-xl hover:shadow-2xl transition">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${f.color} mb-3`}>
              {f.icon}
            </div>
            <h3 className="text-white font-semibold">{f.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: "Speed", v: "Fast" },
          { k: "Privacy", v: "Local" },
          { k: "Theme", v: "Dark" },
          { k: "Export", v: "CSV" },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl p-4 bg-gray-900/70 ring-1 ring-gray-800 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wide">{s.k}</div>
            <div className="text-white font-extrabold text-xl mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-0 mt-16">
        <h3 className="text-2xl font-extrabold text-white mb-6">Articles and guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Budgeting 101: Build a simple plan",
              img: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop",
              excerpt: "Create a realistic budget by separating needs from wants and tracking monthly cash flow.",
              href: "https://www.investopedia.com/budgeting-4689741",
              tag: "Budgeting",
            },
            {
              title: "Income vs Expense: Read your trends",
              img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
              excerpt: "Use charts to compare your income and expenses over time and spot anomalies early.",
              href: "https://www.nerdwallet.com/article/finance/track-spending",
              tag: "Insights",
            },
            {
              title: "Categorize smarter to save more",
              img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop",
              excerpt: "Group similar expenses and set soft limits per category to avoid overspending.",
              href: "https://www.thebalance.com/how-to-categorize-expenses-4589181",
              tag: "Categories",
            },
            {
              title: "Export and audit your data",
              img: "https://images.unsplash.com/photo-1520607162513-8a5b4a5f9b37?q=80&w=1200&auto=format&fit=crop",
              excerpt: "Regularly export CSVs to back up and analyze your transactions in spreadsheets.",
              href: "https://support.google.com/docs/answer/40608",
              tag: "Data",
            },
          ].map((a) => (
            <a key={a.title} href={a.href} target="_blank" rel="noreferrer" className="group rounded-2xl overflow-hidden bg-gray-900/70 ring-1 ring-gray-800 shadow-xl hover:shadow-2xl transition block">
              <div className="relative aspect-video overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-gray-900/80 text-gray-200 ring-1 ring-gray-700">{a.tag}</span>
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold leading-snug line-clamp-2">{a.title}</h4>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{a.excerpt}</p>
                <div className="mt-3 text-sky-400 text-sm inline-flex items-center gap-1">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}


