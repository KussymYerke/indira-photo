"use client";

import { Container } from "@/components/Container";
import { Instagram, Phone, MessageCircle } from "lucide-react";

export function LeadCtaSection({
  instagramUrl,
  phone,
  city,
}: {
  instagramUrl?: string;
  phone?: string;
  city?: string;
}) {
  // Studio-driven contacts only.
  if (!instagramUrl || !phone) return null;

  const phoneDigits = phone.replace(/\D/g, "");
  const telHref = `tel:${phoneDigits}`;
  const waHref = phoneDigits
    ? `https://wa.me/${phoneDigits}`
    : "https://wa.me/";

  return (
    <section className="border-y border-[var(--line)] bg-black/[0.02]">
      {/* на мобильных меньше воздуха */}
      <Container className="py-14 md:py-24">
        <div className="mx-auto max-w-[980px] text-center">
          <div className="text-[11px] tracking-[0.28em] uppercase text-[var(--muted)]">
            для работы
          </div>

          <h2 className="mt-6 font-serif text-[32px] leading-[1.08] sm:text-[40px] md:text-[64px]">
            Давайте снимем ваш проект красиво и честно.
          </h2>

          <p className="mx-auto mt-6 max-w-[70ch] text-[15px] leading-7 text-[var(--muted)]">
            Интерьерные съёмки для дизайнеров и брендов — свет, фактуры,
            композиция и “воздух” в кадре.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full flex gap-2 items-center border border-[var(--line)] px-10 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              <MessageCircle size={22} strokeWidth={1.5} />
              WhatsApp
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full flex gap-2 items-center border border-[var(--line)] px-10 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              <Instagram size={22} strokeWidth={1.5} />
              Instagram
            </a>

            <a
              href={telHref}
              className="rounded-full flex gap-2 items-center border border-[var(--line)] px-10 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              <Phone size={22} strokeWidth={1.5} />
              Позвонить
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-[var(--muted)]">
            <a
              href={telHref}
              className="hover:text-[var(--fg)] hover:underline underline-offset-4 transition"
            >
              {phone}
            </a>
            <span className="opacity-60">•</span>
            <span>{city}</span>
            <span className="opacity-60">•</span>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--fg)] hover:underline underline-offset-4 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
