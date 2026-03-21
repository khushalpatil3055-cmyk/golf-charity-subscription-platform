"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BackButton from "@/components/BackButton";
export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [winners, setWinners] = useState<any[]>([]);

 useEffect(() => {
  checkAdmin();   // 👈 add this
  fetchUsers();
  fetchWinners();
}, []);
const checkAdmin = async () => {
  const { data, error } = await supabase.auth.getUser();

  // ❌ Not logged in
  if (!data.user) {
    window.location.href = "/login";
    return;
  }

  // ❌ Not admin
  if (data.user.email !== "khushalpatil202407100510016@gmail.com") {
    window.location.href = "/dashboard";
    return;
  }

  // ✅ Admin allowed
};
  // ✅ Fetch all users
  async function fetchUsers() {
    const { data } = await supabase.from("profiles").select("*");
    setUsers(data || []);
  }

  // ✅ Fetch winners
  async function fetchWinners() {
    const { data } = await supabase
      .from("draws")
      .select("*, profiles(email)")
      .order("draw_date", { ascending: false });

    setWinners(data || []);
  }

  // 🎲 RUN DRAW
 async function runDraw() {
  const { data: activeUsers, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("subscription_status", "active");

  if (userError) {
    console.error(userError);
    return;
  }

  if (!activeUsers || activeUsers.length === 0) {
    alert("No active users!");
    return;
  }

  const random =
    activeUsers[Math.floor(Math.random() * activeUsers.length)];

  const { error } = await supabase.from("draws").insert([
    {
      user_id: random.id,
      draw_date: new Date(), // ✅ IMPORTANT
    },
  ]);

  if (error) {
    console.error("DRAW ERROR:", error); // 🔥 SEE ERROR
    alert("Error running draw");
  } else {
    alert(`Winner: ${random.email}`);
    fetchWinners();
  }
}

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
          <BackButton />
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Panel</h1>

      {/* USERS */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <h2 className="text-xl mb-4">👥 Users</h2>
        {users.map((u) => (
          <div key={u.id} className="flex justify-between border-b py-2">
            <span>{u.email}</span>
            <span
              className={
                u.subscription_status === "active"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {u.subscription_status || "inactive"}
            </span>
          </div>
        ))}
      </div>

      {/* RUN DRAW */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <h2 className="text-xl mb-4">🎲 Monthly Draw</h2>
        <button
          onClick={runDraw}
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Run Draw
        </button>
      </div>

      {/* WINNERS */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl mb-4">🏆 Winners</h2>
        {winners.map((w) => (
          <div key={w.id} className="border-b py-2">
            <p>{w.profiles?.email}</p>
            <p className="text-sm text-gray-400">
              {new Date(w.draw_date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}