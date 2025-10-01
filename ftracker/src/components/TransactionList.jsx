import React from "react";

export default function TransactionList({ transactions }) {
  if (transactions.length === 0)
    return (
      <li className="py-2 text-gray-500 dark:text-gray-400 text-center">
        No transactions found.
      </li>
    );
  return (
    <ul className="divide-y dark:divide-gray-700">
      {transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((t) => (
          <li
            key={t.id}
            className="flex flex-col sm:flex-row sm:justify-between py-2 items-start sm:items-center"
          >
            <div>
              <span className="font-medium dark:text-white">{t.description}</span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                [{t.category}]
              </span>
              <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                {t.date}
              </span>
            </div>
            <span
              className={`mt-1 sm:mt-0 font-semibold ${t.amount >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {t.amount >= 0 ? "+" : ""}
              ₹{t.amount.toFixed(2)}
            </span>
          </li>
        ))}
    </ul>
  );
}
