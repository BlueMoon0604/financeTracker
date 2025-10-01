import React from "react";

const CATEGORIES = ["Food", "Rent", "Salary", "Entertainment", "Other"];

export default function AddTransactionForm({ form, setForm, onAdd }) {
  return (
    <form
      onSubmit={onAdd}
      className="mb-8 flex flex-col md:flex-row md:flex-wrap gap-4 bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-xl"
      aria-label="Add transaction"
    >
      {/* Description input */}
      <input
        type="text"
        placeholder="Description"
        className="flex-1 min-w-[160px] border-2 border-blue-200 focus:border-blue-500 dark:border-sky-900 dark:focus:border-sky-400 bg-white dark:bg-gray-700 dark:text-white p-3 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-sky-400 block"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
        aria-label="Description"
        autoComplete="off"
      />

      {/* Amount input */}
      <input
        type="number"
        placeholder="Amount"
        className="flex-1 min-w-[100px] border-2 border-emerald-200 focus:border-emerald-500 dark:border-emerald-900 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 dark:text-white p-3 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-emerald-400 block"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
        aria-label="Amount"
      />

      {/* Category select */}
      <select
        className="flex-1 min-w-[120px] border-2 border-yellow-200 focus:border-yellow-400 dark:border-yellow-900 dark:focus:border-yellow-400 bg-white dark:bg-gray-700 dark:text-white p-3 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-yellow-300 block"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        aria-label="Category"
      >
        <option value="" disabled>Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Date input */}
      <input
        type="date"
        className="flex-1 min-w-[150px] border-2 border-pink-200 focus:border-pink-400 dark:border-pink-900 dark:focus:border-pink-400 bg-white dark:bg-gray-700 dark:text-white p-3 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-pink-300 block"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
        aria-label="Date"
      />

      {/* Add button */}
      <button
        type="submit"
        className="w-full md:w-auto mt-2 md:mt-0 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-600 hover:to-emerald-600 px-6 py-3 rounded-xl shadow-lg text-white font-semibold tracking-wide transition-all duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
      >
        Add
      </button>
    </form>
  );
}
