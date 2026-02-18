import Link from "next/link";
import { Container } from "./Container";

type Tile = { src: string; alt: string; caption?: string };

export function HeroMasonry({
  title,
  text,
  tiles,
}: {
  title: string;
  text: string;
  tiles: Tile[];
}) {
  const [a, b, c] = tiles;

  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT */}
          <div className="md:col-span-5 md:pt-10">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              интерьерная фотография • Алматы
            </div>

            <h1 className="mt-4 font-serif text-[44px] leading-[1.05] md:text-[64px]">
              {title}
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

            <div className="mt-10 border-t border-[var(--line)] pt-6 text-[12px] tracking-[0.18em] uppercase text-[var(--muted)]">
              featured works • curated selection
            </div>
          </div>

          {/* RIGHT — строгая сетка */}
          <div className="md:col-span-7">
            {/* фиксируем высоту блока, чтобы всё смотрелось как дизайн */}
            <div className="grid grid-cols-12 gap-4 md:gap-5 md:h-[640px]">
              {/* BIG cover */}
              <figure className="col-span-12 md:col-span-8 md:row-span-2">
                <div className="h-[420px] md:h-full overflow-hidden rounded-[28px] border border-[var(--line)] bg-black/5">
                  <img
                    src={a.src}
                    alt={a.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                  />
                </div>
                {a.caption && (
                  <figcaption className="mt-3 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                    {a.caption}
                  </figcaption>
                )}
              </figure>

              {/* TOP small */}
              <figure className="col-span-12 md:col-span-4">
                <div className="h-[260px] md:h-[300px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-black/5">
                  <img
                    src={b.src}
                    alt={b.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-3 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                    {b.caption}
                  </figcaption>
                )}
              </figure>

              {/* BOTTOM small */}
              <figure className="col-span-12 md:col-span-4">
                <div className="h-[260px] md:h-[300px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-black/5">
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                  />
                </div>
                {c.caption && (
                  <figcaption className="mt-3 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                    {c.caption}
                  </figcaption>
                )}
              </figure>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
