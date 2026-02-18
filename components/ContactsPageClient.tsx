"use client";

import { useMemo, useState } from "react";
import type React from "react";
import { Container } from "@/components/Container";
import { LeadModal } from "@/components/LeadModal";
import {
  Instagram,
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export function ContactsPageClient({
  name,
  tagline,
  city,
  phone,
  instagramUrl,
  portraitUrl,
}: {
  name?: string;
  tagline?: string;
  city?: string;
  phone?: string;
  instagramUrl?: string;
  portraitUrl?: string;
}) {
  const [open, setOpen] = useState(false);

  const phoneDigits = useMemo(
    () => (phone ? phone.replace(/\D/g, "") : ""),
    [phone],
  );
  const telHref = phoneDigits ? `tel:${phoneDigits}` : "#";
  const waHref = phoneDigits
    ? `https://wa.me/${phoneDigits}`
    : "https://wa.me/";

  return (
    <>
      {/* hero */}
      <section className="border-b border-[var(--line)]">
        <Container className="mt-8 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="text-[11px] tracking-[0.28em] uppercase text-[var(--muted)]">
                контакты
              </div>

              <h1 className="mt-6 font-serif text-[40px] leading-[1.05] sm:text-[52px] md:text-[66px]">
                Связаться
              </h1>

              <p className="mt-5 max-w-[70ch] text-[15px] leading-7 text-[var(--muted)]">
                {tagline
                  ? tagline
                  : "Оставьте заявку или напишите в удобный мессенджер — отвечу и уточню детали съёмки."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-full bg-black px-8 py-4 text-[12px] tracking-[0.18em] uppercase text-white hover:opacity-90 transition inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} strokeWidth={1.5} /> WhatsApp
                </button>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] px-8 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition inline-flex items-center gap-2"
                >
                  Instagram <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* portrait / placeholder */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[34px] bg-black/[0.03]" />
              <div className="relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-white">
                {portraitUrl ? (
                  <img
                    src={portraitUrl}
                    alt={name ? `${name} — portrait` : "Portrait"}
                    className="h-[360px] w-full object-cover md:h-[420px]"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-[360px] md:h-[420px] w-full bg-black/[0.04]" />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* cards */}
      <section className="border-b border-[var(--line)]">
        <Container className="py-12 md:py-16">
          <div className="grid gap-5 md:grid-cols-2">
            <Card
              title="WhatsApp"
              icon={<MessageCircle size={18} strokeWidth={1.5} />}
              value="Написать"
              href={waHref}
              external
              hint="Самый быстрый способ"
            />
            <Card
              title="Instagram"
              icon={<Instagram size={18} strokeWidth={1.5} />}
              value="Открыть профиль"
              href={instagramUrl}
              external
              hint="Примеры работ и сторис"
              disabled={!instagramUrl}
            />
            <Card
              title="Телефон"
              icon={<Phone size={18} strokeWidth={1.5} />}
              value={phone || "—"}
              href={telHref}
              hint="Звонки и сообщения"
              disabled={!phoneDigits}
            />
            <Card
              title="Город"
              icon={<MapPin size={18} strokeWidth={1.5} />}
              value={city || "—"}
              hint="Съёмки по договорённости"
            />
          </div>

          {/* small FAQ */}
          <div className="mt-10 rounded-[28px] border border-[var(--line)] bg-white overflow-hidden">
            <div className="p-6 md:p-8 border-b border-[var(--line)]">
              <div className="text-[11px] tracking-[0.28em] uppercase text-[var(--muted)]">
                быстрые ответы
              </div>
              <div className="mt-3 font-serif text-[26px] leading-tight">
                Как проходит съёмка
              </div>
            </div>

            <div className="divide-y divide-[var(--line)]">
              <Faq
                q="Сколько времени занимает съёмка?"
                a="Зависит от размера объекта и задачи. Обычно обсуждаем план заранее, чтобы уложиться в нужное время без спешки."
              />
              <Faq
                q="Вы помогаете с подготовкой объекта?"
                a="Да — подскажу, что лучше убрать/добавить, как расставить акценты и где важен свет, чтобы кадры выглядели дороже."
              />
              <Faq
                q="Можно ли заказать съёмку в другом городе?"
                a="Да, если подходит логистика. Напишите в WhatsApp — обсудим даты и детали."
              />
            </div>
          </div>
        </Container>
      </section>

      <LeadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Card({
  title,
  value,
  hint,
  href,
  icon,
  external,
  disabled,
}: {
  title: string;
  value: string;
  hint?: string;
  href?: string;
  icon?: React.ReactNode;
  external?: boolean;
  disabled?: boolean;
}) {
  const Wrapper: any = href && !disabled ? "a" : "div";
  return (
    <Wrapper
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={[
        "group rounded-[26px] border border-[var(--line)] bg-white p-6 md:p-7 transition",
        href && !disabled
          ? "hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)] hover:-translate-y-[1px]"
          : "",
        disabled ? "opacity-55" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
            {title}
          </div>
          <div className="mt-3 font-serif text-[22px] leading-snug">
            {value}
          </div>
          {hint ? (
            <div className="mt-3 text-[13px] leading-6 text-[var(--muted)]">
              {hint}
            </div>
          ) : null}
        </div>
        <div className="h-11 w-11 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--fg)]/80 group-hover:text-[var(--fg)] transition">
          {icon}
        </div>
      </div>
    </Wrapper>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group p-6 md:p-8">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-6">
          <div className="font-serif text-[18px] md:text-[20px]">{q}</div>
          <div className="h-9 w-9 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--muted)] group-open:rotate-45 transition">
            +
          </div>
        </div>
      </summary>
      <div className="mt-4 text-[14px] leading-7 text-[var(--muted)] max-w-[90ch]">
        {a}
      </div>
    </details>
  );
}
