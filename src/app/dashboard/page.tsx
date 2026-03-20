"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DrawCard from "@/components/DrawCard";
import Layout from "@/components/Layout"; // ✅ FIXED

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [scores, setScores] = useState<any[]>([]);
  const [score, setScore] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      fetchScores(user.id);
    }
  }

  async function fetchScores(userId: string) {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setScores(data || []);
  }

  async function handleAddScore() {
    if (!score || !user) return;

    await supabase.from("scores").insert({
      user_id: user.id,
      score: Number(score),
    });

    const { data: existing } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!existing) {
      await supabase.from("entries").insert({
        user_id: user.id,
      });
    }

    setScore("");
    fetchScores(user.id);
  }

  async function handleSubscribe() {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const text = await res.text();
    console.log("API RESPONSE:", text);

    try {
      const data = JSON.parse(text);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("❌ Not JSON:", text);
    }
  }

  return (
    <Layout user={user}>
      <div className="grid md:grid-cols-3 gap-6">

        {/* ADD SCORE */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl mb-4">📊 Add Score</h2>

          <input
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score"
            className="w-full p-2 rounded bg-gray-700 mb-3"
          />

          <button
            onClick={handleAddScore} // ✅ FIXED
            className="w-full bg-green-500 py-2 rounded-lg hover:bg-green-600"
          >
            Add Score
          </button>

          <div className="mt-3">
            {scores.map((s: any) => (
              <p key={s.id}>Score: {s.score}</p>
            ))}
          </div>
        </div>

        {/* SUBSCRIPTION */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl mb-4">💳 Subscription</h2>

          <button
            onClick={handleSubscribe}
            className="w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
          >
            Subscribe ($5)
          </button>
        </div>

        {/* DRAW */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
         
          <DrawCard />
        </div>

      </div>
    </Layout>
  );
}