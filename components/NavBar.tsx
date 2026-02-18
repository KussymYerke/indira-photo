"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/works", label: "Работы" },
  { href: "/contacts", label: "Контакты" },
];

export function NavBar() {
  const pathname = usePathname();
  const [onHero, setOnHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // If we're not on the home page, there is no hero to observe.
    // Keep header in the readable (non-hero) state.
    if (pathname !== "/") {
      setOnHero(false);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let raf = 0;

    const attach = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        // Hero can mount after navigation; retry on next frame.
        raf = window.requestAnimationFrame(attach);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setOnHero(entry.isIntersecting);
        },
        { threshold: 0.1 },
      );

      observer.observe(hero);
    };

    attach();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  // close mobile menu on route change / resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        onHero
          ? "text-white bg-black/45 backdrop-blur-sm"
          : "text-[var(--fg)] bg-[color:var(--bg)] backdrop-blur-3xl border-b border-[var(--line)]",
      ].join(" ")}
    >
      <Container className="h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group leading-tight">
          <div
            className={[
              "text-[12px] tracking-[0.22em] uppercase transition-colors",
              onHero ? "text-white" : "text-[var(--muted)]",
            ].join(" ")}
          >
            Indira Yusupova
          </div>
          <div
            className={[
              "text-[11px] tracking-[0.18em] uppercase transition-colors",
              onHero ? "text-white/80" : "text-[var(--fg)]/90",
            ].join(" ")}
          >
            interior photographer
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.18em] uppercase">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={[
                "transition-colors",
                onHero
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--muted)] hover:text-[var(--fg)]",
              ].join(" ")}
            >
              {i.label}
            </Link>
          ))}

          <a
            href="https://www.instagram.com/indira_yussupova_ph/"
            target="_blank"
            rel="noreferrer"
            className={[
              "rounded-full px-4 py-2 text-[12px] transition",
              onHero
                ? "border border-white/40 text-white hover:bg-white/10"
                : "border border-[var(--line)] text-[var(--fg)] hover:bg-black/5",
            ].join(" ")}
          >
            Instagram
          </a>
        </nav>

        {/* MOBILE: menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={[
            "md:hidden rounded-full px-4 py-2 text-[12px] tracking-[0.18em] uppercase transition",
            onHero
              ? "border border-white/35 text-white bg-black/20"
              : "border border-[var(--line)] text-[var(--fg)]",
          ].join(" ")}
          aria-expanded={mobileOpen}
          aria-label="Открыть меню"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </Container>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div
          className={[
            "md:hidden border-t",
            onHero
              ? "border-white/15 bg-black/60"
              : "border-[var(--line)] bg-[color:var(--bg)]/95",
          ].join(" ")}
        >
          <Container className="py-4">
            <nav className="flex flex-col gap-3 text-[12px] tracking-[0.18em] uppercase">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setMobileOpen(false)}
                  className={onHero ? "text-white/90" : "text-[var(--fg)]"}
                >
                  {i.label}
                </Link>
              ))}

              <a
                href="https://www.instagram.com/indira_yussupova_ph/"
                target="_blank"
                rel="noreferrer"
                className={[
                  "mt-2 inline-flex items-center justify-center rounded-full px-4 py-3",
                  "text-[12px] tracking-[0.18em] uppercase transition",
                  onHero
                    ? "border border-white/25 text-white hover:bg-white/10"
                    : "border border-[var(--line)] text-[var(--fg)] hover:bg-black/5",
                ].join(" ")}
              >
                Instagram
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
