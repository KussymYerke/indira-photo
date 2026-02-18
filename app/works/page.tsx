import { sanityFetch } from "@/sanity/lib/live";
import { allWorksQuery } from "@/sanity/lib/queries";
import { WorksClient } from "@/components/WorksClient";

export const metadata = {
  title: "Работы — Индира Юсупова | Интерьерный фотограф",
  description:
    "Портфолио: дизайнерские и коммерческие интерьерные съемки. Алматы.",
};

type WorkCategory = "designer" | "commercial";

type WorkCard = {
  _id?: string;
  title: string;
  slug: string;
  category: WorkCategory;
  cover?: any;
  images?: any[];
};

export default async function WorksPage() {
  const { data } = await sanityFetch<WorkCard[]>({ query: allWorksQuery });
  const items = Array.isArray(data) ? data : [];
  return <WorksClient items={items} />;
}
