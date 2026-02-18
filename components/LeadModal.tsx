"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";

type LeadPayload = {
  name: string;
  phone: string;
  instagram?: string;
  message?: string;
};

export function LeadModal({
  open,
  onClose,
  title = "Оставить заявку",
  subtitle = "Оставьте контакты — я свяжусь с вами и уточню детали съёмки.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const hasName = name.trim().length >= 2;
    const hasPhone = phone.replace(/\D/g, "").length >= 10;
    return hasName && hasPhone;
  }, [name, phone]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // reset status when opened
    setOk(null);
    setError(null);
  }, [open]);

  const submit = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);
    setOk(null);

    const payload: LeadPayload = {
      name: name.trim(),
      phone: phone.trim(),
      instagram: instagram.trim() || undefined,
      message: message.trim() || undefined,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Request failed");
      }

      setOk(true);
      setName("");
      setPhone("");
      setInstagram("");
      setMessage("");
    } catch (e: any) {
      setOk(false);
      setError("Не удалось отправить. Попробуйте ещё раз или напишите в Instagram.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* panel */}
      <div className="relative mx-auto flex min-h-full max-w-[1200px] items-center justify-center p-4 md:px-8">
        <div className="w-full max-w-[560px] rounded-[26px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)] max-h-[86vh] overflow-hidden">
          <div className="flex items-start justify-between gap-6 border-b border-[var(--line)] p-6 md:p-7">
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                для работы
              </div>
              <h3 className="mt-2 font-serif text-[28px] leading-tight">{title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-[var(--muted)]">
                {subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Закрыть
            </button>
          </div>

          <div className="p-6 md:p-7 overflow-y-auto max-h-[calc(86vh-92px)]">
            {ok ? (
              <div className="rounded-[18px] border border-[var(--line)] p-5">
                <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
                  отправлено
                </div>
                <div className="mt-2 font-serif text-[22px] leading-snug">
                  Спасибо! Я свяжусь с вами в ближайшее время.
                </div>
                <div className="mt-4">
                  <button
                    onClick={onClose}
                    className="rounded-full bg-black px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-white hover:opacity-90 transition"
                  >
                    Готово
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  <Field
                    label="Имя"
                    placeholder="Как к вам обращаться"
                    value={name}
                    onChange={setName}
                  />

                  <Field
                    label="Телефон"
                    placeholder="+7 ___ ___ __ __"
                    value={phone}
                    onChange={setPhone}
                    inputMode="tel"
                  />

                  <Field
                    label="Instagram (необязательно)"
                    placeholder="@username"
                    value={instagram}
                    onChange={setInstagram}
                  />

                  <Field
                    label="Комментарий (необязательно)"
                    placeholder="Что снимаем? Сроки, локация, формат…"
                    value={message}
                    onChange={setMessage}
                    textarea
                  />
                </div>

                {error && (
                  <div className="mt-4 rounded-[14px] bg-black/5 px-4 py-3 text-[13px] text-[var(--fg)]/85">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[12px] text-[var(--muted)]">
                    Отправляя заявку, вы соглашаетесь на обработку контактных данных.
                  </div>

                  <button
                    onClick={submit}
                    disabled={!canSubmit || loading}
                    className={[
                      "rounded-full px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition",
                      !canSubmit || loading
                        ? "bg-black/20 text-black/50 cursor-not-allowed"
                        : "bg-black text-white hover:opacity-90",
                    ].join(" ")}
                  >
                    {loading ? "Отправка…" : "Отправить"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  textarea,
  inputMode,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="block">
      <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
        {label}
      </div>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full rounded-[16px] border border-[var(--line)] bg-white px-4 py-3 text-[14px] leading-6 outline-none focus:border-black/40 min-h-[120px]"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          className="mt-2 w-full rounded-[16px] border border-[var(--line)] bg-white px-4 py-3 text-[14px] leading-6 outline-none focus:border-black/40"
        />
      )}
    </label>
  );
}
