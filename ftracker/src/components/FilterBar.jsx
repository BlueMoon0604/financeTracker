import React from "react";

export default function FilterBar({ filter, setFilter, exportCSV }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded text-sm ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("income")}
        className={`px-3 py-1 rounded text-sm ${filter === "income" ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
      >
        Income
      </button>
      <button
        onClick={() => setFilter("expense")}
        className={`px-3 py-1 rounded text-sm ${filter === "expense" ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
      >
        Expense
      </button>
      <button
        onClick={exportCSV}
        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
      >
        Export CSV
      </button>
    </div>
  );
}
