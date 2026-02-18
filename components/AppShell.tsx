"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      {!isStudio ? <NavBar /> : null}
      <main>{children}</main>
      {!isStudio ? <Footer /> : null}
    </>
  );
}
