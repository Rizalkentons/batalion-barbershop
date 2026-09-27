import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1";

interface TestimonialsSectionProps {
  googleMapsUrl: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Motong rambut di sini sudah dari SMP sampai sekarang sudah kerja. Kelas banget, murah meriah, dan gratis edukasi rambut juga—dikasih tahu bagusnya bagaimana.",
    name: "Rizal Kentons",
    role: "Pelanggan Google · 5 bintang",
    rating: 5,
  },
  {
    text: "Bagus banget, potongannya rapi. Ruangannya adem dan nyaman banget buat menunggu. Recommended!",
    name: "ananda fitri",
    role: "Pelanggan Google · 5 bintang",
    rating: 5,
  },
  {
    text: "Sudah tiga kali ke sini menemani potong rambut. Pelayanan ramah dan steril. Potongan rapi sesuai keinginan.",
    name: "Nurul Zaatsiyah",
    role: "Local Guide · 5 bintang",
    rating: 5,
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVCEUHuLk7hNwHsMK46FEtck516233A3T76gkMiZrMpGCCp7sfu=w96-h96-p-rp-mo-ba12-br100",
  },
  {
    text: "Tempat bagus, pelayanan ramah, lokasi mudah dijangkau.",
    name: "DIPO SETIAJI",
    role: "Pelanggan Google · 5 bintang",
    rating: 5,
  },
  {
    text: "Bintang 5 pokoknya buat kualitas Batalion Barbershop.",
    name: "AryaW",
    role: "Pelanggan Google · 5 bintang",
    rating: 5,
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 5);

function TestimonialsSection({ googleMapsUrl }: TestimonialsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-24 text-white md:py-32" aria-labelledby="testimonials-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1288px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center"
        >
          <div className="rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
            Our Testimonials
          </div>

          <h2 id="testimonials-title" className="mt-6 max-w-3xl font-display text-5xl font-semibold uppercase leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            Dipercaya untuk
            <span className="block text-primary">setiap gaya.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/62 md:text-base">
            Cerita asli pelanggan yang sudah datang, duduk, dan pulang dengan potongan lebih berkarakter.
          </p>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 transition-colors hover:border-primary/50 hover:bg-primary/8"
          >
            <span className="flex gap-1 text-primary" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <strong className="text-sm">4,7</strong>
            <span className="text-xs text-white/55">dari 180 ulasan Google</span>
            <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
          </a>
        </motion.div>

        <div className="mt-14 flex max-h-[620px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.12em] text-white/38">
          Kutipan dari ulasan publik Google Maps · Teks diringkas tanpa mengubah makna
        </p>
      </div>
    </section>
  );
}

export { TestimonialsSection };
