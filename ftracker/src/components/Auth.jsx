import React, { useState } from "react";

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const switchMode = () => setMode((m) => (m === "login" ? "signup" : "login"));

  const submit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ft_users") || "{}");
    if (mode === "signup") {
      if (users[form.email]) {
        alert("User already exists. Please login.");
        return;
      }
      users[form.email] = { name: form.name || form.email.split("@")[0], password: form.password };
      localStorage.setItem("ft_users", JSON.stringify(users));
      localStorage.setItem("ft_session", JSON.stringify({ email: form.email }));
      onAuth({ email: form.email, name: users[form.email].name });
      return;
    }
    // login
    const user = users[form.email];
    if (!user || user.password !== form.password) {
      alert("Invalid credentials");
      return;
    }
    localStorage.setItem("ft_session", JSON.stringify({ email: form.email }));
    onAuth({ email: form.email, name: user.name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl ring-1 ring-sky-900/40 bg-gray-900/80 backdrop-blur">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">Finance Tracker</h1>
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl overflow-hidden ring-1 ring-gray-700">
            <button onClick={() => setMode("login")} className={`px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-sky-600 text-white" : "bg-gray-800 text-gray-300"}`}>Login</button>
            <button onClick={() => setMode("signup")} className={`px-4 py-2 text-sm font-semibold ${mode === "signup" ? "bg-sky-600 text-white" : "bg-gray-800 text-gray-300"}`}>Sign Up</button>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 ring-1 ring-gray-700 focus:ring-2 focus:ring-sky-600"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 ring-1 ring-gray-700 focus:ring-2 focus:ring-sky-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 ring-1 ring-gray-700 focus:ring-2 focus:ring-sky-600"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"} {" "}
          <button onClick={switchMode} className="text-sky-400 hover:underline">{mode === "login" ? "Sign up" : "Login"}</button>
        </p>
      </div>
    </div>
  );
}


