"use client";

import Image from "next/image";
import { memo } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

function Logo({
  className = "",
  width = 160,
  height = 48,
  priority = false,
  sizes,
}: LogoProps) {
  const combinedClassName = ["h-auto w-auto object-contain", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src="/logo.png"
      alt="Company logo"
      width={width}
      height={height}
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 160px, (max-width: 1024px) 180px, 220px"}
      className={combinedClassName}
    />
  );
}

export default memo(Logo);

