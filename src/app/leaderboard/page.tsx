"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BackButton from "@/components/BackButton";
export default function LeaderboardPage() {
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  async function fetchWinners() {
    const { data, error } = await supabase
      .from("draws")
      .select(`
        id,
        draw_date,
        profiles(email)
      `)
      .order("draw_date", { ascending: false });

    if (!error) {
      setWinners(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
        <BackButton />
      <h1 className="text-3xl font-bold mb-6 text-center">
        🏆 Winners Leaderboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : winners.length === 0 ? (
        <p className="text-center text-gray-400">
          No winners yet
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">

          {winners.map((winner, index) => (
            <div
              key={winner.id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center shadow"
            >
              {/* Rank */}
              <span className="text-xl font-bold text-yellow-400">
                #{index + 1}
              </span>

              {/* Email */}
              <span className="text-gray-200">
                {winner.profiles?.email || "Unknown"}
              </span>

              {/* Date */}
              <span className="text-sm text-gray-400">
                {new Date(winner.draw_date).toLocaleDateString()}
              </span>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}