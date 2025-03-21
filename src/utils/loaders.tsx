import React from "react";
import { cn } from "@/lib/utils";

export function SpinnerLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-primary/30 animate-spin"></div>
        <div className="absolute inset-1 rounded-full border-2 border-l-transparent border-r-transparent border-primary/50 animate-spin animate-reverse"></div>
      </div>
    </div>
  );
}

export function PulseLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-primary/80 animate-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
  );
}

export function ShimmerCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg p-4 space-y-3", className)}>
      <div className="h-6 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 animate-shimmer overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent"></div>
      <div className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700 animate-shimmer overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent"></div>
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-md bg-gray-200 dark:bg-gray-700 animate-shimmer overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent"
            style={{
              width: `${85 - i * 10}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function AppleProgressBar({
  className,
  progress = 0,
}: {
  className?: string;
  progress?: number;
}) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export function FadingDots({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center space-x-1", className)}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary animate-[fadeIn_1s_ease-in-out_infinite_alternate]"
          style={{ animationDelay: `${i * 0.3}s` }}
        ></div>
      ))}
    </div>
  );
}
