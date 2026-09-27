import { useEffect, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: ComponentType<LucideProps>;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash || items[0]?.url;
      const activeItem = items.find((item) => item.url === hash);
      if (activeItem) setActiveTab(activeItem.name);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    const sections = items
      .map((item) => document.querySelector(item.url))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const item = items.find((navItem) => navItem.url === `#${visible.target.id}`);
        if (item) setActiveTab(item.name);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, [items]);

  return (
    <nav
      aria-label="Navigasi utama"
      className={cn(
        "fixed bottom-4 left-1/2 z-[1100] -translate-x-1/2 sm:bottom-auto sm:top-5",
        className,
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/75 p-1.5 shadow-[0_14px_50px_rgba(0,0,0,.42)] backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
              className={cn(
                "relative flex h-10 items-center justify-center gap-2 rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors sm:px-4",
                isActive ? "text-primary" : "text-white/58 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0 sm:hidden" strokeWidth={2} aria-hidden="true" />
              <span className="hidden sm:inline">{item.name}</span>

              {isActive && (
                <motion.span
                  layoutId="batalion-tubelight"
                  className="absolute inset-0 -z-10 rounded-full border border-primary/20 bg-primary/8"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                >
                  <span className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary">
                    <span className="absolute -left-2 -top-2 h-5 w-12 rounded-full bg-primary/20 blur-md" />
                    <span className="absolute left-1/2 top-0 h-4 w-8 -translate-x-1/2 bg-primary/20 blur-sm" />
                  </span>
                </motion.span>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export { NavBar };
export type { NavItem, NavBarProps };
