import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  underlineColor?: string;
}

function AnimatedText({
  text,
  className,
  textClassName,
  underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
  underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
  underlineDuration = 0.75,
  underlineColor = "#f4c430",
}: AnimatedTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn("group relative inline-block max-w-full cursor-default pb-2", className)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <span
        className={cn(
          "relative z-10 block transition-all duration-300 group-hover:text-[#fff7d1] group-hover:[text-shadow:0_0_16px_rgba(244,196,48,.42)]",
          textClassName,
        )}
      >
        {text}
      </span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-0.5 left-0 h-4 w-full overflow-visible"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
      >
        <motion.path
          d={underlinePath}
          fill="none"
          stroke={underlineColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={false}
          animate={{
            d: isHovered ? underlineHoverPath : underlinePath,
            pathLength: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            d: { duration: underlineDuration, ease: "easeInOut" },
            pathLength: { duration: underlineDuration * 0.75, ease: "easeOut" },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>
    </span>
  );
}

export { AnimatedText };
export type { AnimatedTextProps };
