import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface Testimonial {
  text: string;
  image?: string;
  name: string;
  role: string;
  rating?: number;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <figure className="w-full max-w-xs rounded-2xl border border-white/12 bg-[#131313] p-6 shadow-[0_16px_44px_rgba(0,0,0,.34)]">
      <div className="flex gap-1" aria-label={`${testimonial.rating ?? 5} dari 5 bintang`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "h-3.5 w-3.5",
              index < (testimonial.rating ?? 5) ? "fill-primary text-primary" : "text-white/25",
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-7 text-white/78">“{testimonial.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/35 bg-primary/10 text-[11px] font-black text-primary">
            {initials}
          </span>
        )}
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.06em] text-white">{testimonial.name}</span>
          <span className="mt-0.5 block text-[10px] tracking-[0.05em] text-white/50">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function TestimonialsColumn({ className, testimonials, duration = 15 }: TestimonialsColumnProps) {
  const shouldAnimate = testimonials.length > 1;

  return (
    <div className={cn(className)}>
      <motion.div
        animate={shouldAnimate ? { translateY: "-50%" } : undefined}
        transition={shouldAnimate ? { duration, repeat: Infinity, ease: "linear", repeatType: "loop" } : undefined}
        className={cn("flex flex-col gap-6 pb-6", shouldAnimate && "will-change-transform")}
      >
        {(shouldAnimate ? [...testimonials, ...testimonials] : testimonials).map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
        ))}
      </motion.div>
    </div>
  );
}

export { TestimonialsColumn };
export type { Testimonial, TestimonialsColumnProps };