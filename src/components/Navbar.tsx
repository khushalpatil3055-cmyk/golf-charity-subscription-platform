"use client";

export default function Navbar({ user }: any) {
  return (
    <div className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <h1 className="text-xl font-bold">⛳ Golf Club</h1>
      <p className="text-sm text-gray-400">{user?.email}</p>
    </div>
  );
}