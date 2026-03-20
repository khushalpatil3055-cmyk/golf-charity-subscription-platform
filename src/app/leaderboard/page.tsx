"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Leaderboard() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })
      .limit(10);

    if (!error && data) {
      setScores(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-black-600">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* 🔷 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-black">
            🏆 Leaderboard
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
            onClick={() => router.push("/dashboard")}
          >
            Back
          </button>
        </div>

        {/* 🔷 Leaderboard Card */}
        <div className="bg-white p-4 rounded-xl shadow text-black">
          {scores.length === 0 ? (
            <p className="text-gray-500">No scores yet</p>
          ) : (
            <ul className="space-y-3">
              {scores.map((s, index) => (
                <li
                  key={s.id}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  {/* Rank */}
                  <span className="font-semibold w-12">
                    #{index + 1}
                  </span>

                  {/* Score */}
                  <span className="text-lg font-bold flex-1 text-center">
                    {s.score}
                  </span>

                  {/* Date */}
                  <span className="text-sm text-gray-500">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}