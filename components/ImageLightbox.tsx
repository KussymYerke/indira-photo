"use client";

import { useEffect, useMemo, useState } from "react";

type LightboxImage = {
  src: string;
  alt?: string;
};

export function ImageLightbox({
  open,
  images,
  startIndex = 0,
  onClose,
}: {
  open: boolean;
  images: LightboxImage[];
  startIndex?: number;
  onClose: () => void;
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter((i) => !!i?.src) : []),
    [images]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    const bounded = Math.min(
      Math.max(startIndex ?? 0, 0),
      Math.max(safeImages.length - 1, 0)
    );
    setIndex(bounded);
  }, [open, startIndex, safeImages.length]);

  useEffect(() => {
    if (!open) return;

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, safeImages.length]);

  const hasMany = safeImages.length > 1;

  const prev = () => {
    if (!safeImages.length) return;
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  };

  const next = () => {
    if (!safeImages.length) return;
    setIndex((i) => (i + 1) % safeImages.length);
  };

  if (!open) return null;
  if (!safeImages.length) return null;

  const current = safeImages[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-black/85"
      />

      {/* content */}
      <div className="relative z-[101] h-full w-full p-4 md:p-10">

        {/* arrows */}
        {hasMany ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее"
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-[102] rounded-full bg-white/10 px-5 py-3 text-[12px] tracking-[0.18em] uppercase text-white hover:bg-white/15 transition"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующее"
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-[102] rounded-full bg-white/10 px-5 py-3 text-[12px] tracking-[0.18em] uppercase text-white hover:bg-white/15 transition"
            >
              Next
            </button>
          </>
        ) : null}

        <div className="relative h-full w-full flex items-center justify-center">
          {/* close button — solid, above the image */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 md:right-10 md:top-10 z-[102] rounded-full bg-white px-4 py-2 text-[12px] tracking-[0.18em] uppercase text-black shadow hover:bg-white/95 transition"
          >
            Close
          </button>

          {hasMany ? (
            <div className="absolute left-4 top-4 md:left-10 md:top-10 z-[102] hidden sm:block rounded-full bg-white px-4 py-2 text-[12px] tracking-[0.18em] uppercase text-black shadow">
              {index + 1} / {safeImages.length}
            </div>
          ) : null}

          <img
            src={current.src}
            alt={current.alt || ""}
            className="max-h-full max-w-full object-contain select-none"
            draggable={false}
          />
        </div>

        {/* mobile arrows */}
        {hasMany ? (
          <div className="md:hidden absolute inset-x-0 bottom-6 z-[102] flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="rounded-full bg-white/10 px-5 py-3 text-[12px] tracking-[0.18em] uppercase text-white hover:bg-white/15 transition"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-white/10 px-5 py-3 text-[12px] tracking-[0.18em] uppercase text-white hover:bg-white/15 transition"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
