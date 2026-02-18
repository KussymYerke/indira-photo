import Link from "next/link";
import { Container } from "./Container";

type HeroCoverProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export function HeroCover({
  imageSrc,
  title,
  subtitle = "Интерьерный фотограф",
  ctaPrimary,
  ctaSecondary,
}: HeroCoverProps) {
  return (
    <section className="relative h-[86vh] min-h-[620px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay (делает текст читаемым) */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      {/* Content */}
      <Container className="relative h-full">
        <div className="flex h-full items-center justify-center text-center">
          <div className="max-w-[880px] px-4">
            <h1 className="font-serif text-white text-[44px] leading-[1.05] md:text-[78px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
              {title}
            </h1>

            <div className="mt-5 text-white/85 text-[14px] tracking-[0.22em] uppercase">
              {subtitle}
            </div>

            {(ctaPrimary || ctaSecondary) && (
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {ctaPrimary && (
                  <Link
                    href={ctaPrimary.href}
                    className="rounded-full bg-white text-black px-7 py-3 text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition"
                  >
                    {ctaPrimary.label}
                  </Link>
                )}

                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white px-7 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-white/15 transition"
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="text-white/70 text-[11px] tracking-[0.22em] uppercase">
            Scroll
          </div>
        </div>
      </Container>
    </section>
  );
}
