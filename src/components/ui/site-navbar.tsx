import { Home, Images, MapPin, MessageSquareQuote, Scissors, UserRound } from "lucide-react";

import { NavBar, type NavItem } from "@/components/ui/tubelight-navbar";

// Keep this in the same order as the sections appear on the page.
const items: NavItem[] = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Tentang", url: "#about", icon: UserRound },
  { name: "Layanan", url: "#services", icon: Scissors },
  { name: "Galeri", url: "#gallery", icon: Images },
  { name: "Testimoni", url: "#testimonials", icon: MessageSquareQuote },
  { name: "Lokasi", url: "#location", icon: MapPin },
];

function SiteNavbar() {
  return <NavBar items={items} />;
}

export { SiteNavbar };
