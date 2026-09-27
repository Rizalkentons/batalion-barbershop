import React from "react";
import { ArrowRight } from "lucide-react";

import { HoverButton, type HoverButtonProps } from "@/components/ui/hover-glow-button";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends Omit<HoverButtonProps, "children" | "glowColor" | "backgroundColor" | "textColor" | "hoverTextColor"> {
  text?: string;
  tone?: "primary" | "outline";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", tone = "primary", className, ...props }, _ref) => {
  const isPrimary = tone === "primary";

  return (
    <HoverButton
      glowColor="#f4c430"
      backgroundColor={isPrimary ? "#f4c430" : "rgba(9, 9, 9, 0.82)"}
      textColor={isPrimary ? "#090909" : "#ffffff"}
      hoverTextColor={isPrimary ? "#090909" : "#f4c430"}
      className={cn(
        isPrimary ? "border-primary" : "border-white/35 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <span>{text}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </HoverButton>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
