"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ 
        callbackUrl: "/",
        redirect: true 
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect on error
      window.location.href = "/";
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-50"
        title="Logout"
      >
        <LogOut size={18} />
        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
    >
      <LogOut size={20} />
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </button>
  );
}

