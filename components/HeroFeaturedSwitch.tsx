"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "./Container";

type FeaturedItem = {
  title: string;
  subtitle: string; // например: "Дизайнерская съемка"
  src: string;
  tag?: string; // например: "ЖК"
};

export function HeroFeaturedSwitch({
  headline,
  text,
  items,
}: {
  headline: string;
  text: string;
  items: FeaturedItem[];
}) {
  const safeItems = useMemo(() => items.slice(0, 4), [items]);
  const [active, setActive] = useState(0);

  const current = safeItems[active] ?? safeItems[0];

  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT */}
          <div className="md:col-span-5 md:pt-8">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              интерьерная фотография • Алматы
            </div>

            <h1 className="mt-4 font-serif text-[44px] leading-[1.05] md:text-[64px]">
              {headline}
            </h1>

            <p className="mt-5 text-[15px] leading-7 text-[var(--muted)] max-w-[52ch]">
              {text}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/works"
                className="rounded-full bg-black text-white px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition"
              >
                Смотреть работы
              </Link>

              <Link
                href="/contacts"
                className="rounded-full border border-[var(--line)] px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
              >
                Связаться
              </Link>
            </div>

            {/* LIST */}
            <div className="mt-10 border-t border-[var(--line)] pt-6">
              <div className="text-[12px] tracking-[0.18em] uppercase text-[var(--muted)]">
                featured works
              </div>

              <div className="mt-4 grid gap-2">
                {safeItems.map((it, idx) => {
                  const isActive = idx === active;
                  return (
                    <button
                      key={`${it.title}-${idx}`}
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      onClick={() => setActive(idx)}
                      className={[
                        "text-left w-full rounded-2xl border px-4 py-4 transition",
                        isActive
                          ? "border-black/10 bg-black/[0.04]"
                          : "border-[var(--line)] hover:bg-black/[0.03]",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                            {it.subtitle}
                            {it.tag ? ` • ${it.tag}` : ""}
                          </div>
                          <div className="mt-1 font-serif text-[18px] leading-snug text-[var(--fg)]">
                            {it.title}
                          </div>
                        </div>

                        <div
                          className={[
                            "shrink-0 h-9 w-9 rounded-full border flex items-center justify-center",
                            isActive
                              ? "border-black/15 bg-white"
                              : "border-[var(--line)] bg-white",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          <span className="text-[12px] text-[var(--muted)]">
                            ↗
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-[32px] border border-[var(--line)] bg-black/5">
              {/* Image */}
              <div className="h-[520px] md:h-[680px]">
                <img
                  key={current?.src}
                  src={current?.src}
                  alt={current?.title ?? "Featured work"}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* bottom caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-white/80">
                    {current?.subtitle}
                    {current?.tag ? ` • ${current.tag}` : ""}
                  </div>
                  <div className="mt-1 font-serif text-[20px] text-white leading-snug">
                    {current?.title}
                  </div>
                </div>
              </div>

              {/* subtle gradient for readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </div>

            {/* mobile hint */}
            <div className="mt-4 text-[12px] text-[var(--muted)] md:hidden">
              Нажмите на карточку слева, чтобы переключить фото.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
