"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm flex items-center gap-2"
        title="Logout"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
    >
      <LogOut size={20} />
      <span>Logout</span>
    </button>
  );
}

