"use client";

export function WorkImageCard({
  imageSrc,
  title,
  meta,
  onOpen,
  variant = "works",
}: {
  imageSrc: string;
  title: string;
  meta: string;
  onOpen: () => void;
  variant?: "home" | "works";
}) {
  const radius = variant === "home" ? "rounded-[22px]" : "rounded-[22px]";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative w-full overflow-hidden ${radius} bg-black/5 text-left cursor-pointer`}
      aria-label={title}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* hover overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="font-serif text-white text-[22px] leading-snug">
              {title}
            </div>
            <div className="mt-2 text-white/80 text-[11px] tracking-[0.22em] uppercase">
              {meta}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
