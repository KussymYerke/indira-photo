"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import { ImageLightbox } from "@/components/ImageLightbox";
import { WorkImageCard } from "@/components/WorkImageCard";

type WorkCategory = "designer" | "commercial";

type WorkCard = {
  _id?: string;
  title: string;
  slug: string;
  category: WorkCategory;
  cover?: any;
  images?: any[];
};

const categoryLabel: Record<WorkCategory, string> = {
  designer: "Дизайнерские съемки",
  commercial: "Коммерческие съемки",
};

function Tabs({ active }: { active: WorkCategory }) {
  const base =
    "relative inline-flex items-center justify-center rounded-full px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition cursor-pointer pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40";

  const activeCls = "bg-black text-white";
  const inactiveCls =
    "border border-[var(--line)] text-[var(--fg)]/80 hover:bg-black/5";

  return (
    <div className="flex flex-wrap justify-center gap-3 w-full">
      <Link
        href="/works?type=designer"
        aria-current={active === "designer" ? "page" : undefined}
        className={`${base} ${active === "designer" ? activeCls : inactiveCls}`}
      >
        Дизайнерские съемки
      </Link>

      <Link
        href="/works?type=commercial"
        aria-current={active === "commercial" ? "page" : undefined}
        className={`${base} ${
          active === "commercial" ? activeCls : inactiveCls
        }`}
      >
        Коммерческие съемки
      </Link>
    </div>
  );
}

export function WorksClient({ items }: { items: WorkCard[] }) {
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get("type") || "designer";

  const active: WorkCategory =
    typeParam === "commercial" ? "commercial" : "designer";

  const filtered = useMemo(() => {
    const arr = Array.isArray(items) ? items : [];
    return arr.filter((p) => p.category === active);
  }, [items, active]);

  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState<{ src: string; alt?: string }[]>([]);
  const [lbIndex, setLbIndex] = useState(0);

  const openWork = (p: WorkCard) => {
    const imgs = (p.images || [])
      .map((img: any) => ({
        src: img ? urlFor(img).width(2600).url() : "",
        alt: p.title,
      }))
      .filter((i) => !!i.src);

    const coverSource = p.cover || p.images?.[0];
    const cover = coverSource ? urlFor(coverSource).width(2600).url() : "";
    const all = imgs.length
      ? imgs
      : cover
        ? [{ src: cover, alt: p.title }]
        : [];

    setLbImages(all);
    setLbIndex(0);
    setLbOpen(true);
  };

  return (
    <>
      {/* HEADER */}
      <section>
        <Container>
          <div className="flex flex-col gap-8">
            <div className="max-w-[76ch]">
              <h1 className="mt-20 font-serif text-[40px] leading-tight md:text-[56px]">
                Работы
              </h1>

              <p className="mt-6 text-[15px] leading-7 text-[var(--muted)]">
                Выберите тип съемки — и посмотрите проекты.
              </p>
            </div>

            <Tabs active={active} />
          </div>
        </Container>
      </section>

      {/* CATEGORY TITLE + GRID */}
      <section>
        <Container>
          <div className="pt-10 md:pt-14 text-center">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              {active === "designer"
                ? "для портфолио дизайнеров"
                : "для брендов и бизнеса"}
            </div>

            <h2 className="mt-3 font-serif text-[30px] leading-tight md:text-[40px]">
              {categoryLabel[active]}
            </h2>
          </div>

          <div className="mt-10 pb-16">
            {filtered.length === 0 ? (
              <div className="border-t border-[var(--line)] py-14 text-center text-[var(--muted)]">
                Пока нет работ в этой категории.
              </div>
            ) : (
              <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-2">
                {filtered.map((p) => {
                  const coverSource = p.cover || p.images?.[0];
                  const cover = coverSource
                    ? urlFor(coverSource).width(1600).url()
                    : "";

                  const metaParts = [
                    active === "designer"
                      ? "Дизайнерская съемка"
                      : "Коммерческая съемка",
                  ].filter(Boolean);

                  return (
                    <WorkImageCard
                      key={p._id ?? p.slug}
                      variant="works"
                      imageSrc={cover}
                      title={p.title}
                      meta={metaParts.join(" • ")}
                      onOpen={() => openWork(p)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </section>

      <ImageLightbox
        open={lbOpen}
        images={lbImages}
        startIndex={lbIndex}
        onClose={() => setLbOpen(false)}
      />
    </>
  );
}
