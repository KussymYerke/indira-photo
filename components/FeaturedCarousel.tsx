"use client";

import { useMemo, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import { ImageLightbox } from "@/components/ImageLightbox";

type FeaturedWork = {
  _id?: string;
  title: string;
  slug: string;
  category: "designer" | "commercial";
  cover?: any;
  images?: any[];
};

export function FeaturedCarousel({
  items,
  eyebrow,
  title,
}: {
  items: FeaturedWork[];
  eyebrow?: string;
  title?: string;
}) {
  const safeItems = useMemo(() => (items || []).slice(0, 3), [items]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState<{ src: string; alt?: string }[]>([]);
  const [lbIndex, setLbIndex] = useState(0);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const openWork = (p: FeaturedWork) => {
    const imgs = (p.images || [])
      .map((img: any) => ({
        src: img ? urlFor(img).width(2400).url() : "",
        alt: p.title,
      }))
      .filter((i) => !!i.src);

    const coverSource = p.cover || p.images?.[0];
    const cover = coverSource ? urlFor(coverSource).width(2400).url() : "";
    const all = imgs.length ? imgs : cover ? [{ src: cover, alt: p.title }] : [];

    setLbImages(all);
    setLbIndex(0);
    setLbOpen(true);
  };

  // Studio-driven section only. If there is no content yet, render nothing.
  if (!safeItems.length) return null;

  return (
    <section className="py-14 md:py-18">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-4 font-serif text-[34px] leading-tight md:text-[44px]">
                {title}
              </h2>
            ) : null}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Prev
            </button>
            <button
              onClick={() => scrollBy("right")}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Next
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {safeItems.map((p) => {
            const coverSource = p.cover || p.images?.[0];
            const cover = coverSource ? urlFor(coverSource).width(1600).url() : "";
            const meta = [
              p.category === "designer" ? "Дизайнерская съемка" : "Коммерческая съемка",
              // location/year сейчас не храним в Sanity — оставляем только категорию
            ]
              .filter(Boolean)
              .join(" • ");

            return (
              <button
                key={p._id || p.slug}
                type="button"
                onClick={() => openWork(p)}
                className="group relative w-[82%] sm:w-[60%] md:w-[48%] lg:w-[42%] shrink-0 snap-start text-left"
                aria-label={p.title}
              >
                <div className="relative overflow-hidden rounded-[28px] bg-black/5">
                  <div className="aspect-[16/10]">
                    <img
                      src={cover}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* overlay on hover (desktop) */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block">
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <div className="font-serif text-white text-[26px] leading-snug">
                        {p.title}
                      </div>
                      <div className="mt-2 text-white/80 text-[11px] tracking-[0.22em] uppercase">
                        {meta}
                      </div>
                    </div>
                  </div>
                </div>

                {/* caption for mobile */}
                <div className="mt-4 md:hidden">
                  <div className="font-serif text-[20px] leading-snug">{p.title}</div>
                  <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                    {meta}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Container>

      <ImageLightbox
        open={lbOpen}
        images={lbImages}
        startIndex={lbIndex}
        onClose={() => setLbOpen(false)}
      />
    </section>
  );
}
