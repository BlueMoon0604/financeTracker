import React, { useMemo, useState } from "react";
// Dark mode toggle removed; app is dark-only now
import AddTransactionForm from "./components/AddTransactionForm.jsx";
import BalanceSummary from "./components/BalanceSummary.jsx";
import TransactionList from "./components/TransactionList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import CategoryPieChart from "./components/CategoryPieChart.jsx";
import KpiCards from "./components/KpiCards.jsx";
import TrendsCharts from "./components/TrendsCharts.jsx";
import Auth from "./components/Auth.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dark] = useState(true);
  const [user, setUser] = useState(null);
  const [current, setCurrent] = useState("home");

  // restore session
  React.useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("ft_session") || "null");
      if (session && session.email) {
        const users = JSON.parse(localStorage.getItem("ft_users") || "{}");
        const u = users[session.email];
        if (u) setUser({ email: session.email, name: u.name });
      }
    } catch {}
  }, []);

  const onAdd = (e) => {
    e.preventDefault();
    const newTx = {
      id: crypto.randomUUID(),
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    };
    setTransactions((prev) => [...prev, newTx]);
    setForm({ description: "", amount: "", category: "", date: "" });
  };

  const filtered = useMemo(() => {
    if (filter === "income") return transactions.filter((t) => t.amount >= 0);
    if (filter === "expense") return transactions.filter((t) => t.amount < 0);
    return transactions;
  }, [transactions, filter]);

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.amount >= 0).reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
    const balance = income + expense;
    return { income, expense, balance };
  }, [transactions]);

  const categoryPieData = useMemo(() => {
    const map = new Map();
    for (const t of filtered) {
      const prev = map.get(t.category) || 0;
      map.set(t.category, prev + Math.abs(t.amount));
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  const exportCSV = () => {
    const header = ["id", "description", "amount", "category", "date"];
    const rows = [header.join(",")].concat(
      transactions.map((t) => [t.id, t.description, t.amount, t.category, t.date].join(","))
    );
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return <Auth onAuth={setUser} />;
  }

  return (
    <div className={`dark`}>
      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black`}>
        <Navbar user={user} current={current} setCurrent={setCurrent} onLogout={() => { localStorage.removeItem("ft_session"); setUser(null); }} />
        <main className="flex flex-col min-h-screen items-stretch px-4 py-10 gap-8">
          {current === "home" ? (
            <Home onGetStarted={() => setCurrent("tracker")} />
          ) : (
            <>
              <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
                <h1 className={`text-4xl md:text-5xl font-extrabold tracking-wide text-white`}>Finance Tracker</h1>
                <div className="text-sm text-gray-300">Hi, {user.name}</div>
              </div>

              <div className="max-w-7xl w-full mx-auto">
        <AddTransactionForm form={form} setForm={setForm} onAdd={onAdd} />
              </div>

              <div className="max-w-7xl w-full mx-auto">
                <KpiCards
                  totalIncome={totals.income}
                  totalExpense={totals.expense}
                  balance={totals.balance}
                  count={transactions.length}
                />
              </div>

              <div className="max-w-7xl w-full mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-emerald-500">Trends</h2>
                  </div>
                  <TrendsCharts transactions={filtered} />
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl p-4 shadow-xl ring-1 ring-violet-300 dark:ring-violet-700 bg-gradient-to-br from-white/90 to-violet-50/80 dark:from-gray-800/80 dark:to-gray-900/70 backdrop-blur-md">
                    <h3 className="text-sm font-semibold mb-2 text-violet-700 dark:text-violet-300">Category pie</h3>
                    <CategoryPieChart data={categoryPieData} />
                  </div>
                  <div className="rounded-2xl p-4 shadow-xl ring-1 ring-gray-300 dark:ring-gray-700 bg-gradient-to-br from-white/90 to-gray-50/70 dark:from-gray-800/80 dark:to-gray-900/70 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Transactions</h3>
                      <FilterBar filter={filter} setFilter={setFilter} exportCSV={exportCSV} />
                    </div>
                    <TransactionList transactions={filtered} />
                    <div className="mt-3">
                      <BalanceSummary total={totals.balance} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
      </main>
      </div>
    </div>
  );
}



