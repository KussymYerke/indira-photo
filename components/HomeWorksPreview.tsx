import Link from "next/link";
import { Container } from "./Container";
import { projects } from "@/lib/works-data";

export function HomeWorksPreview() {
  // Берем 6 первых работ
  const items = projects.slice(0, 6);

  return (
    <section className="border-t border-[var(--line)] py-14 md:py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              работы
            </div>
            <h2 className="mt-3 font-serif text-[30px] leading-tight md:text-[40px]">
              Избранные проекты
            </h2>
          </div>

          <Link
            href="/works"
            className="hidden md:inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
          >
            Все работы
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}`}
              className="group"
            >
              <div className="overflow-hidden rounded-[22px] bg-black/5">
                <div className="aspect-[4/3]">
                  <img
                    src={p.images[0]?.src}
                    alt={p.images[0]?.alt || p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                  {p.category === "designer" ? "Дизайнерская съёмка" : "Коммерческая съёмка"}
                </div>
                <div className="mt-2 text-[16px] text-[var(--fg)]/90 group-hover:underline underline-offset-4">
                  {p.title}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/works"
            className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
          >
            Все работы
          </Link>
        </div>
      </Container>
    </section>
  );
}
