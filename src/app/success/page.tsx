"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    activateSubscription();
  }, []);

  async function activateSubscription() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const userId = user.id;

    // ✅ 1. Activate subscription
    await supabase
      .from("profiles")
      .update({ subscription_status: "active" })
      .eq("id", userId);

    // ✅ 2. Add to draw (avoid duplicate)
    const { data: existing } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!existing) {
      await supabase.from("entries").insert({
        user_id: userId,
      });
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">

      {loading ? (
        <h1 className="text-xl">Processing payment...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">
            🎉 Payment Successful!
          </h1>

          <p className="text-gray-400 mb-6">
            You are now subscribed and entered into the draw.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-green-600 px-6 py-3 rounded-lg"
          >
            Go to Dashboard
          </button>
        </>
      )}

    </div>
  );
}