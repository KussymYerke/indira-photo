"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";

type Slide = { src: string; title: string; subtitle: string };

export function HeroFullscreen({
  slides,
  headline,
  text,
}: {
  slides: Slide[];
  headline: string;
  text: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="relative">
      {/* фон-слайдер */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className="h-[82vh] min-h-[560px] w-full">
                <img
                  src={s.src}
                  alt={s.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* затемнение/градиент для читаемости */}
      {/* затемнение + мягкий градиент */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {/* контент */}
      <div className="absolute inset-0">
        <Container className="h-full flex items-end pb-10 md:pb-14">
          <div className="max-w-[780px]">
            <div className="text-[12px] tracking-[0.22em] uppercase text-white/75">
              интерьерная фотография • Алматы
            </div>

            <h1 className="mt-4 font-serif text-white text-[44px] leading-[1.05] md:text-[64px]">
              {headline}
            </h1>

            <p className="mt-5 text-white/80 text-[15px] leading-7 max-w-[60ch]">
              {text}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 pointer-events-auto">
              <Link
                href="/works"
                className="rounded-full bg-white text-black px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition"
              >
                Смотреть работы
              </Link>
              <Link
                href="/contacts"
                className="rounded-full border border-white/30 text-white px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition"
              >
                Связаться
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-between gap-6 text-[11px] tracking-[0.22em] uppercase text-white/70 pointer-events-auto">
              <div>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </div>

              <div className="flex gap-2">
                <button
                  className="rounded-full border border-white/30 px-4 py-2 hover:bg-white/10"
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  Prev
                </button>
                <button
                  className="rounded-full border border-white/30 px-4 py-2 hover:bg-white/10"
                  onClick={() => emblaApi?.scrollNext()}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-5 text-white/70 text-[12px]">
              <span className="uppercase tracking-[0.18em]">
                {slides[index]?.subtitle}
              </span>
              <span className="mx-3 opacity-50">—</span>
              <span className="font-serif text-[16px] text-white">
                {slides[index]?.title}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
