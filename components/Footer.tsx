import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-[12px] tracking-[0.18em] uppercase text-[var(--muted)]">
          © {new Date().getFullYear()} Indira Yusupova
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] tracking-[0.18em] uppercase">
          <a
            href="https://www.instagram.com/indira_yussupova_ph/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--fg)] transition"
          >
            Instagram
          </a>
          <a
            href="tel:+77777777777"
            className="text-[var(--muted)] hover:text-[var(--fg)] transition"
          >
            +7 777 777 77 77
          </a>
          <span className="text-[var(--muted)]">Алматы</span>
        </div>
      </Container>
    </footer>
  );
}
