import React, { useRef } from "react";

import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  children?: React.ReactNode;
}

function GlowCard({
  glowColor = "244, 196, 48",
  className,
  children,
  onPointerMove,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    }
    onPointerMove?.(event);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative isolate overflow-hidden border border-white/12 bg-[#111111]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(420px_circle_at_var(--spotlight-x,50%)_var(--spotlight-y,50%),rgba(var(--glow-color),0.23),transparent_46%)]",
        "after:pointer-events-none after:absolute after:inset-px after:-z-10 after:bg-[linear-gradient(145deg,rgba(255,255,255,.035),transparent_50%)]",
        "hover:border-primary/55 hover:before:opacity-100",
        className,
      )}
      style={{ "--glow-color": glowColor } as React.CSSProperties}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children ?? (
          <div className="flex min-h-64 items-end p-8">
            <p className="font-display text-3xl uppercase">Batalion Barbershop</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { GlowCard };
