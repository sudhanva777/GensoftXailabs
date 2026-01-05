import React from "react";

interface LogoProps {
  variant?: "text" | "symbol" | "badge";
  className?: string;
}

export default function Logo({ variant = "text", className = "" }: LogoProps) {
  if (variant === "text") {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className="gradient-text text-2xl md:text-3xl font-extrabold tracking-tight">
          GENSOFT X AI LABS
        </span>
        <span className="text-xs md:text-sm text-gray-600 font-medium mt-0.5">
          Innovation & Training
        </span>
      </div>
    );
  }

  if (variant === "symbol") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-float"
        >
          <defs>
            <linearGradient id="gensoftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path
            d="M20 8L28 16L20 24L12 16L20 8Z"
            fill="url(#gensoftGradient)"
            className="icon-glow"
          />
          <path
            d="M20 16L24 20L20 24L16 20L20 16Z"
            fill="url(#gensoftGradient)"
            opacity="0.8"
          />
        </svg>
        <div className="flex flex-col">
          <span className="gradient-text text-xl md:text-2xl font-extrabold tracking-tight">
            GENSOFT X AI LABS
          </span>
          <span className="text-xs text-gray-600 font-medium">
            Innovation & Training
          </span>
        </div>
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#3B82F6] flex items-center justify-center text-white font-extrabold text-xs ${className}`}>
        GX
      </div>
    );
  }

  return null;
}

