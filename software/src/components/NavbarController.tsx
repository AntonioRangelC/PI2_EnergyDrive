"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarController() {
  const pathname = usePathname();

  
  const noNavbarRoutes = ["/pages/login", "/pages/register"];

  if (noNavbarRoutes.includes(pathname)) {
    return null; 
  }

  return <Navbar />;
}
