import { Home, Images, MapPin, Scissors, UserRound } from "lucide-react";

import { NavBar, type NavItem } from "@/components/ui/tubelight-navbar";

const items: NavItem[] = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Tentang", url: "#about", icon: UserRound },
  { name: "Layanan", url: "#services", icon: Scissors },
  { name: "Galeri", url: "#gallery", icon: Images },
  { name: "Lokasi", url: "#location", icon: MapPin },
];

function SiteNavbar() {
  return <NavBar items={items} />;
}

export { SiteNavbar };
