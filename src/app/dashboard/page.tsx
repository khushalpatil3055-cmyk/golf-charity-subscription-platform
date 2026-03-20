"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Get logged in user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        await fetchScores(session.user.id);
      }

      setLoading(false);
    };

    getUser();
  }, [router]);

  // ✅ Fetch scores
  const fetchScores = async (userId: string) => {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setScores(data);
    }
  };

  // ✅ Add score
  const handleAddScore = async () => {
    if (!score || !user) return;

    const { data, error } = await supabase
      .from("scores")
      .insert([
        {
          user_id: user.id,
          score: Number(score),
        },
      ])
      .select();

    if (error) {
      alert("Error adding score");
    } else if (data) {
      setScore("");
      setScores((prev) => [...data, ...prev]);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center text-black">
      <div className="w-full max-w-2xl">

        {/* 🔷 Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {user && (
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            )}
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* 🔷 Add Score Card */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-lg font-medium mb-3 text-black">
            Add New Score
          </h2>

          <div className="flex gap-2 ">
            <input
              className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              type="number"
              placeholder="Enter score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={handleAddScore}
            >
              Add
            </button>
          </div>
        </div>

        {/* 🔷 Scores List */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-medium mb-4 ">
            Your Scores
          </h2>

          {scores.length === 0 ? (
            <p className="text-gray-500">No scores yet</p>
          ) : (
            <ul className="space-y-3">
              {scores.map((s) => (
                <li
                  key={s.id}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <span className="font-semibold text-lg ">
                    {s.score}
                  </span>
                  <span className="text-sm text-gray-500 ">
                    {new Date(s.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🔷 Leaderboard Button */}
        <button
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          onClick={() => router.push("/leaderboard")}
        >
          View Leaderboard
        </button>

      </div>
    </div>
  );
}