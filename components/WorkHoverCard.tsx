import Link from "next/link";

type WorkHoverCardProps = {
  href: string;
  image: string;
  title: string;
  meta?: string; // "Жилой проект • Алматы • 2025"
};

export function WorkHoverCard({
  href,
  image,
  title,
  meta,
}: WorkHoverCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[18px] bg-black/5"
      aria-label={title}
    >
      {/* image */}
      <div className="aspect-[4/3] w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-white font-serif text-[22px] leading-tight">
            {title}
          </div>
          {meta && (
            <div className="mt-2 text-white/80 text-[12px] tracking-[0.18em] uppercase">
              {meta}
            </div>
          )}
        </div>
      </div>

      {/* mobile caption (без hover) */}
      <div className="md:hidden mt-3">
        <div className="font-serif text-[18px] leading-snug">{title}</div>
        {meta && (
          <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[var(--muted)]">
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}
