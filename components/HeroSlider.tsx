"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

type Slide = { src: string; title: string; subtitle: string };

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white/40"
      >
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className="aspect-[4/5] w-full bg-black/[.02]">
                {/* пока placeholder — ты заменишь на реальные фото */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="text-[12px] tracking-[0.18em] uppercase text-[var(--muted)]">
                  {s.subtitle}
                </div>
                <div className="mt-1 font-serif text-[22px] leading-tight">
                  {s.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
        <div>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-full border border-[var(--line)] px-4 py-2 hover:bg-black/5"
            onClick={() => emblaApi?.scrollPrev()}
          >
            Prev
          </button>
          <button
            className="rounded-full border border-[var(--line)] px-4 py-2 hover:bg-black/5"
            onClick={() => emblaApi?.scrollNext()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
