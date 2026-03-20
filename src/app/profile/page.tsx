"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    // ✅ Fetch profile info
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
              <BackButton />
        <h1 className="text-2xl font-bold mb-6 text-center">
          👤 Profile
        </h1>

        {/* EMAIL */}
        <div className="mb-4">
          <p className="text-gray-400">Email</p>
          <p className="text-lg">{user?.email}</p>
        </div>

        {/* SUBSCRIPTION */}
        <div className="mb-4">
          <p className="text-gray-400">Subscription</p>
          <p
            className={`text-lg font-semibold ${
              profile?.subscription_status === "active"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {profile?.subscription_status || "inactive"}
          </p>
        </div>

        {/* JOIN DATE */}
        <div className="mb-6">
          <p className="text-gray-400">Joined</p>
          <p>
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}