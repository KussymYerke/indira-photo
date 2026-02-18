export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ProjectGallery } from "@/components/ProjectGallery";
import { client } from "@/sanity/lib/client";
import { allWorkSlugsQuery, workBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Work = {
  _id?: string;
  title: string;
  slug: string;
  category: "designer" | "commercial";
  excerpt?: string;
  cover?: any;
  images?: any[];
};

export async function generateStaticParams() {
  const slugs = (await client.fetch(allWorkSlugsQuery)) as { slug: string }[];
  return (slugs || []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = (await client.fetch(workBySlugQuery, { slug: params.slug })) as Work | null;
  if (!p) return {};
  return {
    title: `${p.title} — Индира Юсупова`,
    description: p.excerpt,
  };
}

export default async function WorkDetailsPage({ params }: { params: { slug: string } }) {
  const p = (await client.fetch(workBySlugQuery, { slug: params.slug })) as Work | null;
  if (!p) return notFound();

  const images = (p.images || [])
    .map((img: any) => ({
      src: img ? urlFor(img).width(1800).url() : "",
      alt: p.title,
    }))
    .filter((i) => !!i.src);

  return (
    <section className="pt-10 pb-16">
      <Container>
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
              {p.category === "designer" ? "Дизайнерская съёмка" : "Коммерческая съёмка"}
            </div>
            <h1 className="mt-3 font-serif text-[34px] leading-tight md:text-[48px]">
              {p.title}
            </h1>
            {p.excerpt && (
              <p className="mt-4 max-w-[72ch] text-[15px] leading-7 text-[var(--muted)]">
                {p.excerpt}
              </p>
            )}
          </div>

          <Link
            href={`/works?type=${p.category}`}
            className="hidden md:inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
          >
            ← Назад
          </Link>
        </div>

        <ProjectGallery images={images} className="mt-10" />

        <div className="mt-10 md:hidden">
          <Link
            href={`/works?type=${p.category}`}
            className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
          >
            ← Назад
          </Link>
        </div>
      </Container>
    </section>
  );
}
