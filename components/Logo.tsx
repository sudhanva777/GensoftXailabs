"use client";

import Image from "next/image";
import { memo } from "react";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  taglineClassName?: string;
  showTagline?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

function Logo({
  className = "",
  imageClassName = "",
  textClassName = "",
  taglineClassName = "",
  showTagline = false,
  width = 160,
  height = 48,
  priority = false,
  sizes,
}: LogoProps) {
  const containerClassName = ["flex items-center gap-3", className]
    .filter(Boolean)
    .join(" ");

  const imageClasses = ["h-auto w-auto object-contain", imageClassName]
    .filter(Boolean)
    .join(" ");

  const brandTextClasses = [
    "text-white text-sm sm:text-base font-semibold tracking-[0.28em] uppercase whitespace-nowrap",
    textClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const taglineClasses = [
    "text-slate-500 text-[0.65rem] sm:text-xs font-medium tracking-[0.32em] uppercase",
    taglineClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <Image
        src="/logo.png"
        alt="GENSOFT AI LABS logo"
        width={width}
        height={height}
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 140px, (max-width: 1024px) 160px, 200px"}
        className={imageClasses}
      />
      <div className="flex flex-col justify-center">
        <span className={brandTextClasses}>GENSOFT AI LABS</span>
        {showTagline && (
          <span className={taglineClasses}>Engineering Intelligent Software</span>
        )}
      </div>
    </div>
  );
}

export default memo(Logo);

