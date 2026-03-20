"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children, user }: any) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-900 min-h-screen">
        <Navbar user={user} />

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}