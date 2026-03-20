"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">

      {/* 🔷 Navbar */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold">GolfRewards</h1>

        <div className="space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
          >
            signup
          </button>
        </div>
      </div>

      {/* 🔷 Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Track Your Golf Scores <br /> & Win Monthly Rewards ⛳
        </h2>

        <p className="text-gray-300 max-w-xl mb-8">
          Join a modern golf platform where your performance earns you
          rewards. Compete, improve, and support charities — all in one place.
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-lg font-semibold"
        >
          Start Playing
        </button>
      </div>

      {/* 🔷 Features */}
      <div className="grid md:grid-cols-3 gap-6 px-8 mt-20">

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">📊 Track Scores</h3>
          <p className="text-gray-400">
            Easily log your last 5 golf scores and monitor performance.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">🎲 Monthly Draws</h3>
          <p className="text-gray-400">
            Enter automatic prize draws based on your game activity.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">💖 Charity Support</h3>
          <p className="text-gray-400">
            A portion of your subscription goes to charities you choose.
          </p>
        </div>

      </div>

      {/* 🔷 How It Works */}
      <div className="mt-20 px-8 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <h3 className="text-lg font-semibold mb-2">1. Sign Up</h3>
            <p className="text-gray-400">
              Create your account in seconds.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. Add Scores</h3>
            <p className="text-gray-400">
              Track your latest golf rounds easily.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. Win Rewards</h3>
            <p className="text-gray-400">
              Get entered into monthly prize draws.
            </p>
          </div>

        </div>
      </div>

      {/* 🔷 CTA Section */}
      <div className="mt-20 text-center pb-16">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Play & Win?
        </h2>

        <button
          onClick={() => router.push("/signup")}
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-lg font-semibold"
        >
          Join Now
        </button>
      </div>

    </div>
  );
}