import { ReceiptPricing, type ReceiptPlan } from "@/components/ui/receipt-pricing";

interface Service {
  name: string;
  price: string;
  tag: string;
  featured?: boolean;
  features: string[];
}

interface ServiceCardsProps {
  services: Service[];
  whatsappNumber: string;
}

function ServiceCards({ services, whatsappNumber }: ServiceCardsProps) {
  const plans: ReceiptPlan[] = services.map((service) => {
    const numericPrice = Number.parseInt(service.price.replace(/\D/g, ""), 10);
    const message = encodeURIComponent(
      `Halo Batalion Barbershop, saya ingin booking ${service.name}. Apakah ada slot yang tersedia hari ini?`,
    );

    return {
      id: service.name.toLowerCase().replace(/\s+/g, "-"),
      name: service.name,
      tagline: service.featured ? "Recommended · Best value" : service.tag,
      monthly: numericPrice,
      featured: service.featured,
      cta: "Booking Sekarang",
      href: `https://wa.me/${whatsappNumber}?text=${message}`,
      items: service.features.map((feature) => ({ label: feature, value: "Incl." })),
    };
  });

  return (
    <ReceiptPricing
      plans={plans}
      merchant="Batalion Barbershop"
      merchantNote="Puri Beta · Larangan, Tangerang"
      orderPrefix="BTL"
      showStamp
      showBarcode
    />
  );
}

export { ServiceCards };
