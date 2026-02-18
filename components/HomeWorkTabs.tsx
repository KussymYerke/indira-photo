"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { ImageLightbox } from "@/components/ImageLightbox";
import { WorkImageCard } from "@/components/WorkImageCard";

export type WorkCategory = "designer" | "commercial";

type WorkCard = {
  _id?: string;
  title: string;
  slug: string;
  category: WorkCategory;
  cover?: any;
  images?: any[];
};

// карточка вынесена в WorkImageCard

export function HomeWorksTabs({
  designerItems,
  commercialItems,
}: {
  designerItems: WorkCard[];
  commercialItems: WorkCard[];
}) {
  const [active, setActive] = useState<WorkCategory>("designer");

  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState<{ src: string; alt?: string }[]>([]);
  const [lbIndex, setLbIndex] = useState(0);

  const items = useMemo(() => {
    const src = active === "designer" ? designerItems : commercialItems;
    const arr = Array.isArray(src) ? src : [];
    return arr.slice(0, 9);
  }, [active, designerItems, commercialItems]);

  const openWork = (p: WorkCard) => {
    const imgs = (p.images || [])
      .map((img: any) => ({
        src: img ? urlFor(img).width(2200).url() : "",
        alt: p.title,
      }))
      .filter((i) => !!i.src);

    const coverSource = p.cover || p.images?.[0];
    const cover = coverSource ? urlFor(coverSource).width(2200).url() : "";
    const all = imgs.length
      ? imgs
      : cover
        ? [{ src: cover, alt: p.title }]
        : [];

    setLbImages(all);
    setLbIndex(0);
    setLbOpen(true);
  };

  const tabBase =
    "rounded-full px-5 py-3 text-[12px] tracking-[0.18em] uppercase transition";
  const tabActive = "bg-black text-white";
  const tabInactive =
    "border border-[var(--line)] text-[var(--fg)]/80 hover:bg-black/5";

  return (
    <section className="py-14 md:py-18 border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              портфолио
            </div>
            <h2 className="mt-4 font-serif text-[34px] leading-tight md:text-[44px]">
              Работы
            </h2>
          </div>

          {/* Tabs centered */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActive("designer")}
              className={[
                tabBase,
                active === "designer" ? tabActive : tabInactive,
              ].join(" ")}
            >
              Дизайнерские съемки
            </button>

            <button
              onClick={() => setActive("commercial")}
              className={[
                tabBase,
                active === "commercial" ? tabActive : tabInactive,
              ].join(" ")}
            >
              Коммерческие съемки
            </button>
          </div>

          {/* Grid (like reference) */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const coverSource = p.cover || p.images?.[0];
              const cover = coverSource
                ? urlFor(coverSource).width(1200).url()
                : "";
              const meta = [
                active === "designer"
                  ? "Дизайнерская съемка"
                  : "Коммерческая съемка",
              ]
                .filter(Boolean)
                .join(" • ");

              return (
                <WorkImageCard
                  key={p._id ?? p.slug}
                  variant="home"
                  imageSrc={cover}
                  title={p.title}
                  meta={meta}
                  onOpen={() => openWork(p)}
                />
              );
            })}
          </div>

          {/* CTA to full works page */}
          <div className="flex justify-center pt-4">
            <Link
              href={`/works?type=${active}`}
              className="rounded-full border border-[var(--line)] px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Смотреть все работы →
            </Link>
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lbOpen}
        images={lbImages}
        startIndex={lbIndex}
        onClose={() => setLbOpen(false)}
      />
    </section>
  );
}
