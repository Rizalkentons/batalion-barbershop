import { Scissors } from "lucide-react";

import { HoverButton } from "@/components/ui/hover-glow-button";
import { cn } from "@/lib/utils";

interface ReceiptPlanItem {
  label: string;
  value: string;
}

interface ReceiptPlan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  featured?: boolean;
  cta: string;
  href?: string;
  items: ReceiptPlanItem[];
}

interface ReceiptPricingProps {
  plans: ReceiptPlan[];
  merchant?: string;
  merchantNote?: string;
  orderPrefix?: string;
  showStamp?: boolean;
  showBarcode?: boolean;
  children?: React.ReactNode;
}

const receiptClipPath =
  "polygon(0 12px,5% 0,10% 12px,15% 0,20% 12px,25% 0,30% 12px,35% 0,40% 12px,45% 0,50% 12px,55% 0,60% 12px,65% 0,70% 12px,75% 0,80% 12px,85% 0,90% 12px,95% 0,100% 12px,100% calc(100% - 12px),95% 100%,90% calc(100% - 12px),85% 100%,80% calc(100% - 12px),75% 100%,70% calc(100% - 12px),65% 100%,60% calc(100% - 12px),55% 100%,50% calc(100% - 12px),45% 100%,40% calc(100% - 12px),35% 100%,30% calc(100% - 12px),25% 100%,20% calc(100% - 12px),15% 100%,10% calc(100% - 12px),5% 100%,0 calc(100% - 12px))";

function formatPrice(value: number) {
  return new Intl.NumberFormat("id-ID").format(value * 1000);
}

function ReceiptPricing({
  plans,
  merchant = "Batalion Barbershop",
  merchantNote = "Modern style · Classic craft",
  orderPrefix = "BT",
  showStamp = true,
  showBarcode = true,
  children,
}: ReceiptPricingProps) {
  return (
    <div className="w-full">
      {children}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-4">
        {plans.map((plan, index) => (
          <article
            key={plan.id}
            className={cn(
              "receipt-card group relative mx-auto w-full max-w-md transition-transform duration-300 hover:-translate-y-2",
              plan.featured && "lg:-translate-y-4 lg:hover:-translate-y-6",
            )}
          >
            {plan.featured && (
              <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-primary bg-black px-5 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-[0_0_24px_rgba(244,196,48,.28)]">
                Recommended
              </div>
            )}

            <div
              className="relative min-h-[650px] overflow-hidden bg-[#f3edda] px-7 pb-9 pt-11 font-mono text-[#171613] shadow-[0_22px_60px_rgba(0,0,0,.34)] sm:px-9"
              style={{ clipPath: receiptClipPath }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_180_180%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.9%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%22.8%22/%3E%3C/svg%3E')]" />

              <div className="relative z-10 flex min-h-[590px] flex-col">
                <header className="text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border-2 border-black">
                    <Scissors className="h-5 w-5" strokeWidth={2.3} aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-[11px] font-black uppercase tracking-[0.18em]">{merchant}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-black/60">{merchantNote}</p>
                </header>

                <div className="my-6 border-t-2 border-dashed border-black/45" />

                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-black/55">
                  <span>Order #{orderPrefix}-{String(index + 1).padStart(3, "0")}</span>
                  <span>Open Daily</span>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-black/55">{plan.tagline}</p>
                  <h3 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[-0.04em] text-black">
                    {plan.name}
                  </h3>
                </div>

                <div className="my-7 border-t-2 border-dashed border-black/45" />

                <ul className="grid gap-4">
                  {plan.items.map((item) => (
                    <li key={item.label} className="flex items-end gap-2 text-[11px] font-bold uppercase tracking-[0.04em]">
                      <span className="shrink-0">{item.label}</span>
                      <span className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-black/35" aria-hidden="true" />
                      <span className="shrink-0 text-[9px] text-black/55">{item.value}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="border-y-2 border-dashed border-black/45 py-5">
                    <div className="flex items-end justify-between">
                      <span className="text-[11px] font-black uppercase tracking-[0.12em]">Total</span>
                      <p className="font-display text-5xl font-semibold leading-none tracking-[-0.04em]">
                        <small className="mr-1 font-mono text-[10px]">Rp</small>
                        {formatPrice(plan.monthly)}
                      </p>
                    </div>
                  </div>

                  {showBarcode && (
                    <div className="mt-6">
                      <div className="receipt-barcode mx-auto h-10 w-4/5" aria-hidden="true" />
                      <p className="mt-1 text-center text-[8px] tracking-[0.36em] text-black/65">
                        {orderPrefix}{plan.monthly}00{index + 1}2026
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-center">
                    <HoverButton
                      href={plan.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      glowColor="#f4c430"
                      backgroundColor="#171613"
                      textColor="#ffffff"
                      hoverTextColor="#f4c430"
                      className="h-12 min-w-44 border-black/50"
                    >
                      {plan.cta}
                    </HoverButton>
                  </div>
                </div>
              </div>

              {showStamp && plan.featured && (
                <div className="pointer-events-none absolute right-5 top-[46%] rotate-[-12deg] rounded-full border-[3px] border-[#b28700]/55 px-4 py-3 text-center font-mono text-[9px] font-black uppercase tracking-[0.11em] text-[#9b7400]/65">
                  Best Value
                  <span className="block text-[7px]">Batalion Pick</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export { ReceiptPricing };
export type { ReceiptPlan, ReceiptPlanItem, ReceiptPricingProps };
