import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
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

/** A section becomes "current" once its top edge has crossed this fraction of the viewport height. */
const PROBE_LINE = 0.4;
/** A scroll started by a link counts as finished once the page has stood still for this long. */
const SETTLE_MS = 160;
/** One slow frame may add at most this much to the standstill clock, so jank is not read as "arrived". */
const MAX_FRAME_MS = 34;
/** Keys that scroll the page. Pressing one means the user has taken over from a link's scroll. */
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

/**
 * Tracks which section the visitor is reading, and lets a link "travel" to a section.
 *
 * Two things want to move the highlight: scrolling (whatever section is under the probe line)
 * and clicking a link (the section that link points to). A click starts a smooth scroll that
 * passes over every section in between, so while that trip is running the sections passing by
 * are ignored. Otherwise the highlight would hop through each of them on its way.
 */
function useActiveSection(items: NavItem[]) {
  const [active, setActive] = useState(items[0]?.name ?? "");
  const travelRef = useRef<(name: string) => void>(() => {});

  useEffect(() => {
    const sections = items.flatMap((item) => {
      const element = document.querySelector<HTMLElement>(item.url);
      return element ? [{ name: item.name, element }] : [];
    });
    if (sections.length === 0) return;

    let travellingTo: string | null = null;
    let syncFrame = 0;
    let settleFrame = 0;

    // The lowest section whose top edge is already above the probe line.
    const currentSection = () => {
      const probe = window.innerHeight * PROBE_LINE;
      let current = sections[0];
      let currentTop = -Infinity;
      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top;
        if (top <= probe && top > currentTop) {
          current = section;
          currentTop = top;
        }
      }
      return current.name;
    };

    const stopTravelling = () => {
      travellingTo = null;
      cancelAnimationFrame(settleFrame);
      settleFrame = 0;
    };

    const sync = () => {
      syncFrame = 0;
      const current = currentSection();
      if (travellingTo !== null) {
        if (current !== travellingTo) return; // Still on the way: ignore what is passing by.
        stopTravelling(); // Arrived.
      }
      setActive(current);
    };

    const requestSync = () => {
      if (!syncFrame) syncFrame = requestAnimationFrame(sync);
    };

    const travelTo = (name: string) => {
      stopTravelling();
      travellingTo = name;
      setActive(name);

      // Safety net for trips that never "arrive" (already there, or the page is too short for
      // the section to reach the probe line): let go once the page has stopped moving.
      let lastY = window.scrollY;
      let lastTime = performance.now();
      let stillFor = 0;
      const watch = (now: number) => {
        const y = window.scrollY;
        stillFor = Math.abs(y - lastY) < 0.5 ? stillFor + Math.min(now - lastTime, MAX_FRAME_MS) : 0;
        lastY = y;
        lastTime = now;
        if (stillFor >= SETTLE_MS) {
          stopTravelling();
          sync();
          return;
        }
        settleFrame = requestAnimationFrame(watch);
      };
      settleFrame = requestAnimationFrame(watch);
    };
    travelRef.current = travelTo;

    // Any link on the page that points at a section (hero buttons, footer, back/forward).
    const onHashChange = () => {
      const item = items.find((navItem) => navItem.url === window.location.hash);
      if (item) travelTo(item.name);
    };

    // The visitor scrolling by hand cancels a trip, so the highlight follows them again.
    const onUserScroll = (event: Event) => {
      if (travellingTo === null) return;
      if (event instanceof KeyboardEvent && !SCROLL_KEYS.has(event.key)) return;
      stopTravelling();
      requestSync();
    };

    // A page opened on "#gallery" scrolls there by itself, which is a trip like any other.
    const initial = items.find((navItem) => navItem.url === window.location.hash);
    if (initial) travelTo(initial.name);
    else sync();

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    return () => {
      travelRef.current = () => {};
      stopTravelling();
      cancelAnimationFrame(syncFrame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
  }, [items]);

  const travelTo = useCallback((name: string) => travelRef.current(name), []);

  return [active, travelTo] as const;
}

function NavBar({ items, className }: NavBarProps) {
  const [activeTab, travelTo] = useActiveSection(items);

  return (
    <nav
      aria-label="Navigasi utama"
      className={cn(
        "fixed bottom-4 left-1/2 z-[1100] -translate-x-1/2 md:bottom-auto md:top-5",
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
              onClick={() => travelTo(item.name)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
              className={cn(
                "relative flex h-10 items-center justify-center gap-2 rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors md:px-4",
                isActive ? "text-primary" : "text-white/58 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0 md:hidden" strokeWidth={2} aria-hidden="true" />
              <span className="hidden md:inline">{item.name}</span>

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
