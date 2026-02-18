"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type HeroSlide = {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  footerLeftLabel?: string;
  footerProject?: string;
};

export function HeroCarousel({ slides: slidesProp }: { slides?: HeroSlide[] } = {}) {
  // ====== CONFIG ======
  const AUTOPLAY_MS = 6000; // время между автослайдами
  const TRANSITION_MS = 700; // скорость слайда
  const ZOOM_ENABLED = true;
  const ZOOM_ACTIVE = 1.02; // маленький зум (можешь 1.01/1.03)
  const ZOOM_DELAY_MS = 220; // зум стартует после "settle"
  // ====================

  // Render ONLY content coming from Sanity Studio.
  // If Studio is not configured yet (no slides), we show nothing (no placeholders).
  const slides: HeroSlide[] = useMemo(
    () => (slidesProp && slidesProp.length ? slidesProp : []),
    [slidesProp],
  );

  if (!slides.length) return null;

  const realCount = slides.length;

  // делаем "клоны" по краям: [last, ...real, first]
  const extended = useMemo(() => {
    if (realCount === 0) return [];
    const first = slides[0];
    const last = slides[realCount - 1];
    return [last, ...slides, first];
  }, [slides, realCount]);

  // pos — позиция внутри extended (1..realCount = реальные)
  const [pos, setPos] = useState(1);
  const [anim, setAnim] = useState(true);

  // zoomOn: зум включается только после settle
  const [zoomOn, setZoomOn] = useState(false);

  // чтобы автоплей сбрасывался при ручном клике — используем "token"
  const [tick, setTick] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const curRealIndex = (() => {
    // pos: 1..realCount => 0..realCount-1
    let idx = pos - 1;
    if (idx < 0) idx = realCount - 1;
    if (idx > realCount - 1) idx = 0;
    return idx;
  })();

  const cur = String(curRealIndex + 1).padStart(2, "0");
  const tot = String(realCount).padStart(2, "0");

  const scheduleZoom = () => {
    setZoomOn(false);
    window.setTimeout(() => setZoomOn(true), ZOOM_DELAY_MS);
  };

  // запускаем/перезапускаем зум при смене позиции
  useEffect(() => {
    scheduleZoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos]);

  const resetAutoplay = () => setTick((t) => t + 1);

  const goNext = () => {
    resetAutoplay();
    setAnim(true);
    setPos((p) => p + 1);
  };

  const goPrev = () => {
    resetAutoplay();
    setAnim(true);
    setPos((p) => p - 1);
  };

  // autoplay: каждый tick (и каждое изменение pos) — новый таймер
  useEffect(() => {
    if (realCount <= 1) return;

    const id = window.setTimeout(() => {
      setAnim(true);
      setPos((p) => p + 1);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(id);
  }, [tick, pos, realCount]);

  // teleport после завершения transition:
  // если приехали на clone слева (pos=0) => прыгаем на реальный last (pos=realCount)
  // если приехали на clone справа (pos=realCount+1) => прыгаем на реальный first (pos=1)
  const handleTransitionEnd = () => {
    if (!anim) return;

    if (pos === 0) {
      setAnim(false);
      setPos(realCount);
      scheduleZoom();
      return;
    }

    if (pos === realCount + 1) {
      setAnim(false);
      setPos(1);
      scheduleZoom();
      return;
    }
  };

  // после "телепорта" возвращаем анимацию обратно (на следующий кадр)
  useEffect(() => {
    if (!anim) {
      const id = window.setTimeout(() => setAnim(true), 16);
      return () => window.clearTimeout(id);
    }
  }, [anim]);

  if (extended.length === 0) return null;

  // translateX в процентах (каждый слайд = 100%)
  const translate = `translate3d(-${pos * 100}%, 0, 0)`;

  return (
<section
  id="hero"
  className="relative w-screen overflow-hidden border-b border-[var(--line)]"
>
      {/* фиксируем высоту hero */}
      <div className="relative min-h-[82vh] md:min-h-[88vh]">
        {/* ====== SLIDER BACKGROUND ====== */}
        <div className="absolute inset-0">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className="absolute inset-0 flex h-full w-full"
            style={{
              transform: translate,
              transition: anim
                ? `transform ${TRANSITION_MS}ms ease-in-out`
                : "none",
              willChange: "transform",
            }}
          >
            {extended.map((s, i) => {
              const isActive = i === pos; // активен тот, что сейчас в окне
              const scale =
                ZOOM_ENABLED && isActive ? (zoomOn ? ZOOM_ACTIVE : 1.0) : 1.0;

              return (
                <div
                  key={`${i}-${s.title}`}
                  className="relative h-full w-full shrink-0"
                >
                  {/* картинка */}
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      transform: `scale(${scale})`,
                      transition: isActive
                        ? "transform 2200ms ease-out"
                        : "transform 250ms ease-out",
                      willChange: "transform",
                    }}
                  />

                  {/* затемнение / градиент — ВСЕГДА на весь экран */}
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ====== CONTENT (как в скрине) ====== */}
        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-28">
          {/* карточка-контейнер под текст (чтобы позиция была одинаковой и “низко”) */}
          <div className="max-w-[760px]">
            <div className="text-white/85 text-[11px] tracking-[0.28em] uppercase">
              {slides[curRealIndex].eyebrow}
            </div>

            <h1 className="mt-4 font-serif text-white text-[44px] leading-[1.02] md:text-[64px]">
              {slides[curRealIndex].title}
            </h1>

            {slides[curRealIndex].subtitle && (
              <p className="mt-6 text-white/80 text-[15px] leading-7 md:text-[16px] max-w-[62ch]">
                {slides[curRealIndex].subtitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={slides[curRealIndex].primaryCta.href}
                className="rounded-full bg-white text-black px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-white/90 transition"
              >
                {slides[curRealIndex].primaryCta.label}
              </Link>

              <Link
                href={slides[curRealIndex].secondaryCta.href}
                className="rounded-full border border-white/35 text-white px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition"
              >
                {slides[curRealIndex].secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM BAR (fixed inside hero) ===== */}
        {/* Bottom bar: desktop only (mobile stays clean) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden md:block">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 pb-6 md:pb-8">
            {/* тонкая линия сверху (по желанию) */}
            <div className="mb-4 h-px w-full bg-white/15" />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 text-white/80">
              {/* LEFT: FEATURED */}
              <div className="text-[12px] tracking-[0.18em] uppercase">
                <span className="opacity-70">
                  {slides[curRealIndex].footerLeftLabel}
                </span>
                <span className="mx-3 opacity-40">—</span>
                <span className="opacity-90">
                  {slides[curRealIndex].footerProject}
                </span>
              </div>

              {/* RIGHT: NAV */}
              <div className="pointer-events-auto flex items-center justify-between md:justify-end gap-4">
                <div className="text-[12px] tracking-[0.18em] uppercase">
                  {cur} <span className="opacity-40">/</span> {tot}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="rounded-full border border-white/30 px-4 py-2 text-white/85 text-[12px] hover:bg-white/10 transition"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full border border-white/30 px-4 py-2 text-white/85 text-[12px] hover:bg-white/10 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* небольшой нижний отступ уже не нужен, bottom-bar его заменяет */}
      </div>
    </section>
  );
}
