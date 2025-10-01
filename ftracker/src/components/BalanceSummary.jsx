import React from "react";

export default function BalanceSummary({ total }) {
  return (
    <h2 className="font-semibold dark:text-white">
      Balance:{" "}
      <span className={total >= 0 ? "text-green-600" : "text-red-600"}>
        ₹{total.toFixed(2)}
      </span>
    </h2>
  );
}
