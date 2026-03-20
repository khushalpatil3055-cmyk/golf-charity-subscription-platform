"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DrawCard() {
  const [winner, setWinner] = useState<any>(null);

  useEffect(() => {
    fetchWinner();
  }, []);

  async function fetchWinner() {
    const { data } = await supabase
      .from("draws")
      .select("*, profiles(email)")
      .order("draw_date", { ascending: false })
      .limit(1);

    setWinner(data?.[0]);
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">🎲 Monthly Draw</h2>

      {winner ? (
        <p className="text-green-400">
          Winner: {winner.profiles?.email}
        </p>
      ) : (
        <p className="text-gray-400">No draw yet</p>
      )}
    </div>
  );
}