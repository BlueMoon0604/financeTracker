import React from "react";

export default function KpiCards({ totalIncome, totalExpense, balance, count }) {
  const kpis = [
    {
      label: "Income",
      value: `₹${totalIncome.toFixed(2)}`,
      accent: "from-emerald-400 to-emerald-600",
      ring: "ring-emerald-300",
    },
    {
      label: "Expenses",
      value: `₹${Math.abs(totalExpense).toFixed(2)}`,
      accent: "from-rose-400 to-rose-600",
      ring: "ring-rose-300",
    },
    {
      label: "Balance",
      value: `₹${balance.toFixed(2)}`,
      accent: balance >= 0 ? "from-sky-400 to-emerald-500" : "from-rose-400 to-rose-600",
      ring: balance >= 0 ? "ring-sky-300" : "ring-rose-300",
    },
    {
      label: "Transactions",
      value: `${count}`,
      accent: "from-indigo-400 to-purple-600",
      ring: "ring-indigo-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`relative overflow-hidden rounded-2xl p-4 shadow-xl ring-1 ${kpi.ring} bg-white/80 dark:bg-gray-800/80 backdrop-blur-md`}
        >
          <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${kpi.accent}`} />
          <div className="relative">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{kpi.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


