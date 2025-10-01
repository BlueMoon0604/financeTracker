import React from "react";

function Avatar({ name = "User", email = "", size = 36 }) {
  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
    return Math.abs(h);
  }
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hue = hashString(email || name) % 360;
  const bg = `hsl(${hue} 70% 35% / 1)`;
  const ring = `hsl(${hue} 80% 60% / 0.4)`;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold ring-2"
      style={{ width: size, height: size, background: bg, boxShadow: `0 0 0 2px ${ring} inset` }}
      title={name}
    >
      <span className="text-xs select-none">{initials}</span>
    </div>
  );
}

export default function Navbar({ user, current, setCurrent, onLogout }) {
  return (
    <nav className="w-full sticky top-0 z-30 backdrop-blur bg-gray-900/70 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500" />
          <span className="text-white font-extrabold tracking-wide">FTracker</span>
        </div>
        <div className="flex items-center gap-2">
          {(["home", "tracker"]).map((id) => (
            <button
              key={id}
              onClick={() => setCurrent(id)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition ${current === id ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/60"}`}
            >
              {id === "home" ? "Home" : "Tracker"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-gray-300 text-sm">Hi, {user.name}</span>
          <Avatar name={user.name} email={user.email} />
          <button onClick={onLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>
    </nav>
  );
}


