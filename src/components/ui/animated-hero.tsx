import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight, Scissors } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface HeroProps {
  backgroundImage: string;
  whatsappUrl: string;
  servicesHref?: string;
}

function Hero({ backgroundImage, whatsappUrl, servicesHref = "#services" }: HeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Mengerti kamu", "Hanya 55K", "Paham Model Terkini"],
    [],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleNumber((current) => (current + 1) % titles.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [titles.length]);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-cover bg-[center_34%] bg-no-repeat md:bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,.62)_0%,rgba(0,0,0,.72)_52%,rgba(0,0,0,.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,.12),rgba(0,0,0,.6)_80%)]"
      />

      <div className="mx-auto w-full max-w-[1288px] px-4 sm:px-6">
        <div className="flex min-h-[100svh] flex-col items-center justify-center gap-8 pb-16 pt-28 lg:gap-9 lg:py-40">
          <div>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="h-10 gap-3 rounded-full border border-white/15 bg-black/45 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md hover:bg-primary hover:text-black"
            >
              <a href="#location">
                <Scissors className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Puri Beta · Buka setiap hari
                <MoveRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="max-w-6xl text-center font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
              <span className="block text-white">Barbershop yang</span>
              <span className="relative mt-2 flex h-[1.12em] w-full justify-center overflow-hidden pt-1 text-center text-primary md:pb-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={titles[titleNumber]}
                    className="absolute whitespace-nowrap text-[0.54em] font-semibold tracking-[-0.035em] sm:text-[0.62em] md:text-[0.68em]"
                    initial={{ opacity: 0, y: "100%", filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: "-100%", filter: "blur(6px)" }}
                    transition={{ type: "spring", stiffness: 65, damping: 16 }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="mx-auto flex w-full max-w-3xl flex-col items-center gap-1 px-4 py-3 text-center text-sm leading-7 tracking-tight text-white/72 sm:text-base md:text-lg md:leading-8">
              <AnimatedText
                text="Capster berpengalaman yang memahami model terkini."
                className="mx-auto"
                textClassName="text-center"
              />
              <AnimatedText
                text="Dari basic hingga premium cut—hasil rapi, pelayanan nyaman, dan harga tetap affordable."
                className="mx-auto"
                textClassName="text-center"
                underlineDuration={0.9}
              />
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <InteractiveHoverButton
              text="Lihat layanan"
              href={servicesHref}
              tone="outline"
              className="w-full sm:w-auto"
            />
            <InteractiveHoverButton
              text="Booking WhatsApp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/72 sm:text-xs md:text-[13px]">
            <span>11.00–21.00 WIB</span>
            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
            <span>Haircut mulai 45K</span>
            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
            <span>Larangan, Tangerang</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
