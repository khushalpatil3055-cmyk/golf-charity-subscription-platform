"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <Link href="/dashboard" className="block hover:text-purple-400">
        🏠 Home
      </Link>

      <Link href="/leaderboard" className="block hover:text-purple-400">
        🏆 Leaderboard
      </Link>

      <Link href="/profile" className="block hover:text-purple-400">
        👤 Profile
      </Link>

      <Link href="/admin" className="block hover:text-purple-400">
        🛠 Admin
      </Link>
    </div>
  );
}