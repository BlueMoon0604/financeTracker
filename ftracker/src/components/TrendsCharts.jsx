import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  // Area chart removed per design update
} from "recharts";

function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export default function TrendsCharts({ transactions }) {
  const { daily, byCategory } = useMemo(() => {
    const dayMap = new Map();
    const catMap = new Map();
    for (const t of transactions) {
      const key = t.date;
      const prev = dayMap.get(key) || { income: 0, expense: 0 };
      if (t.amount >= 0) prev.income += t.amount; else prev.expense += Math.abs(t.amount);
      dayMap.set(key, prev);

      const cPrev = catMap.get(t.category) || { income: 0, expense: 0 };
      if (t.amount >= 0) cPrev.income += t.amount; else cPrev.expense += Math.abs(t.amount);
      catMap.set(t.category, cPrev);
    }

    const dailyArr = Array.from(dayMap.entries())
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, v]) => ({ date, label: formatDateLabel(date), income: v.income, expense: v.expense, net: v.income - v.expense }));

    const catArr = Array.from(catMap.entries()).map(([name, v]) => ({ name, income: v.income, expense: v.expense }));

    return { daily: dailyArr, byCategory: catArr };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className="rounded-2xl p-4 shadow-xl ring-1 ring-sky-300 dark:ring-sky-700 bg-gradient-to-br from-white/90 to-sky-50/80 dark:from-gray-800/80 dark:to-gray-900/70 backdrop-blur-md">
        <h3 className="text-sm font-semibold mb-2 text-sky-700 dark:text-sky-300">Daily income vs expense</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={daily} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#14b8a6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl p-4 shadow-xl ring-1 ring-emerald-300 dark:ring-emerald-700 bg-gradient-to-br from-white/90 to-emerald-50/80 dark:from-gray-800/80 dark:to-gray-900/70 backdrop-blur-md">
        <h3 className="text-sm font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Category breakdown</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={byCategory} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" stackId="a" fill="#34d399" />
              <Bar dataKey="expense" stackId="a" fill="#fb7185" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


