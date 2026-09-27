import { Sparkles } from "lucide-react";

import { HoverButton } from "@/components/ui/hover-glow-button";

interface Treatment {
  name: string;
  price: string;
}

interface TreatmentReceiptProps {
  treatments: Treatment[];
  whatsappNumber: string;
}

const receiptClipPath =
  "polygon(0 10px,4% 0,8% 10px,12% 0,16% 10px,20% 0,24% 10px,28% 0,32% 10px,36% 0,40% 10px,44% 0,48% 10px,52% 0,56% 10px,60% 0,64% 10px,68% 0,72% 10px,76% 0,80% 10px,84% 0,88% 10px,92% 0,96% 10px,100% 0,100% calc(100% - 10px),96% 100%,92% calc(100% - 10px),88% 100%,84% calc(100% - 10px),80% 100%,76% calc(100% - 10px),72% 100%,68% calc(100% - 10px),64% 100%,60% calc(100% - 10px),56% 100%,52% calc(100% - 10px),48% 100%,44% calc(100% - 10px),40% 100%,36% calc(100% - 10px),32% 100%,28% calc(100% - 10px),24% 100%,20% calc(100% - 10px),16% 100%,12% calc(100% - 10px),8% 100%,4% calc(100% - 10px),0 100%)";

function TreatmentReceipt({ treatments, whatsappNumber }: TreatmentReceiptProps) {
  const message = encodeURIComponent(
    "Halo Batalion Barbershop, saya ingin bertanya tentang layanan tambahan. Bisa dibantu informasinya?",
  );

  return (
    <div className="mx-auto mt-12 w-full max-w-5xl">
      <section
        className="receipt-card relative overflow-hidden bg-[#f3edda] px-6 py-12 font-mono text-[#171613] shadow-[0_22px_60px_rgba(0,0,0,.3)] sm:px-10 lg:px-14"
        style={{ clipPath: receiptClipPath }}
        aria-labelledby="additional-services-title"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#171613_0.65px,transparent_0.65px)] [background-size:5px_5px]" />

        <div className="relative z-10">
          <header className="flex flex-col items-center justify-between gap-5 border-b-2 border-dashed border-black/40 pb-7 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-black">
                <Sparkles className="h-5 w-5" strokeWidth={2.3} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/55">Batalion Barbershop</p>
                <h3 id="additional-services-title" className="mt-1 font-display text-3xl font-semibold uppercase tracking-[-0.03em] sm:text-4xl">
                  Additional Services
                </h3>
              </div>
            </div>
            <div className="rotate-[-5deg] rounded-full border-[3px] border-[#9b7400]/55 px-5 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#8d6b00]/70">
              Extra Care
            </div>
          </header>

          <div className="grid gap-x-12 gap-y-6 py-8 sm:grid-cols-2">
            {treatments.map((treatment, index) => (
              <div key={treatment.name} className="flex items-end gap-2 text-xs font-black uppercase tracking-[0.04em]">
                <span className="mr-1 text-[9px] text-black/45">{String(index + 1).padStart(2, "0")}</span>
                <span className="shrink-0">{treatment.name}</span>
                <span className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-black/35" aria-hidden="true" />
                <strong className="shrink-0 font-display text-2xl font-semibold">
                  <small className="mr-1 font-mono text-[8px]">Rp</small>{treatment.price}
                </strong>
              </div>
            ))}
          </div>

          <footer className="flex flex-col items-center justify-between gap-7 border-t-2 border-dashed border-black/40 pt-7 sm:flex-row">
            <div className="w-full sm:max-w-xs">
              <div className="receipt-barcode h-9 w-full" aria-hidden="true" />
              <p className="mt-1 text-center text-[7px] tracking-[0.4em] text-black/55">BTL-EXTRA-CARE-2026</p>
            </div>
            <HoverButton
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              glowColor="#f4c430"
              backgroundColor="#171613"
              textColor="#ffffff"
              hoverTextColor="#f4c430"
              className="h-12 min-w-48 border-black/50"
            >
              Tanya Layanan
            </HoverButton>
          </footer>
        </div>
      </section>
    </div>
  );
}

export { TreatmentReceipt };
