"use client";

import { useMemo, useRef } from "react";
import clsx from "clsx";

type ImageItem = { src: string; alt: string };

export function ProjectGallery({
  images,
  className,
}: {
  images: ImageItem[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasMany = images.length > 1;

  const scrollBy = (dir: -1 | 1) => {
    if (!ref.current) return;
    const el = ref.current;
    const width = el.clientWidth;
    el.scrollBy({ left: dir * (width * 0.9), behavior: "smooth" });
  };

  // для стабильного ключа в hydration
  const items = useMemo(() => images.map((i, idx) => ({ ...i, key: `${idx}-${i.src}` })), [images]);

  return (
    <div className={clsx("relative", className)}>
      {hasMany && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="pointer-events-auto ml-2 md:ml-3 rounded-full border border-[var(--line)] bg-[color:var(--bg)]/80 backdrop-blur px-3 py-2 text-[12px] hover:bg-black/5 transition"
            aria-label="Назад"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="pointer-events-auto mr-2 md:mr-3 rounded-full border border-[var(--line)] bg-[color:var(--bg)]/80 backdrop-blur px-3 py-2 text-[12px] hover:bg-black/5 transition"
            aria-label="Вперёд"
          >
            →
          </button>
        </div>
      )}

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-[28px] border border-[var(--line)] bg-black/5 p-3 md:p-4"
      >
        {items.map((img) => (
          <div
            key={img.key}
            className="min-w-[85%] md:min-w-[70%] lg:min-w-[60%] snap-center overflow-hidden rounded-[22px] bg-black/10"
          >
            <div className="aspect-[16/10]">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
