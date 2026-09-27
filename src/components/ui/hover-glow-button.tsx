import React, { useRef } from "react";

import { cn } from "@/lib/utils";

interface HoverButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> {
  children?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

function HoverButton({
  children = "Hover Me!",
  href,
  target,
  rel,
  glowColor = "#f4c430",
  backgroundColor = "#090909",
  textColor = "#ffffff",
  hoverTextColor = "#f4c430",
  className,
  type = "button",
  onPointerMove,
  onPointerLeave,
  ...props
}: HoverButtonProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const element = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      element.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
    }
    (onPointerMove as React.PointerEventHandler<HTMLButtonElement> | undefined)?.(
      event as React.PointerEvent<HTMLButtonElement>,
    );
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const element = elementRef.current;
    if (element) {
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "50%");
    }
    (onPointerLeave as React.PointerEventHandler<HTMLButtonElement> | undefined)?.(
      event as React.PointerEvent<HTMLButtonElement>,
    );
  };

  const sharedClassName = cn(
    "group relative inline-flex h-14 min-w-48 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 px-7",
    "text-center text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "hover:-translate-y-0.5 hover:border-primary/80 hover:shadow-[0_0_28px_rgba(244,196,48,.22)]",
    className,
  );

  const sharedStyle = {
    "--glow-x": "50%",
    "--glow-y": "50%",
    "--glow-color": glowColor,
    "--button-bg": backgroundColor,
    "--button-text": textColor,
    "--button-hover-text": hoverTextColor,
    backgroundColor,
    color: textColor,
  } as React.CSSProperties;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(110px circle at var(--glow-x) var(--glow-y), ${glowColor}, transparent 72%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(85px circle at var(--glow-x) var(--glow-y), ${glowColor}33, transparent 74%)`,
        }}
      />
      <span
        className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-[var(--button-hover-text)]"
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={elementRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={sharedClassName}
        style={sharedStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.Ref<HTMLButtonElement>}
      type={type}
      className={sharedClassName}
      style={sharedStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {content}
    </button>
  );
}

export { HoverButton };
export type { HoverButtonProps };
