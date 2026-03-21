
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
const ADMIN_EMAIL = "khushalpatil202407100510016@gmail.com";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
useEffect(() => {
  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      if (data.user.email === ADMIN_EMAIL) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };
  checkUser();
}, []);

 const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else if (data.session) {
    const userEmail = data.user.email;

    if (userEmail === ADMIN_EMAIL) {
      router.push("/admin"); // 👈 redirect to admin
    } else {
      router.push("/dashboard"); // 👈 normal users
    }
  }
};

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-80">
        <h1 className="text-2xl mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded mb-3"
        >
          Login
        </button>

        <button
          onClick={handleGoogle}
          className="w-full bg-red-500 py-2 rounded"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}