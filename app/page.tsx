import { HeroCarousel } from "@/components/HeroCarousel";
import { AboutSection } from "@/components/AboutSection";
import { HomeWorksTabs } from "@/components/HomeWorkTabs";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { LeadCtaSection } from "@/components/LeadCtaSection";
import { sanityFetch } from "@/sanity/lib/live";
import {
  settingsQuery,
  heroQuery,
  featuredSectionQuery,
  worksByCategoryQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type HeroSlide = {
  image: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  footerLeftLabel?: string;
  footerProject?: string;
};

export default async function HomePage() {
  const { data: settings } = await sanityFetch<any>({ query: settingsQuery });
  const { data: hero } = await sanityFetch<any>({ query: heroQuery });
  const { data: featuredSection } = await sanityFetch<any>({
    query: featuredSectionQuery,
  });

  const { data: designerItems } = await sanityFetch<any[]>({
    query: worksByCategoryQuery,
    params: { category: "designer" },
  });

  const { data: commercialItems } = await sanityFetch<any[]>({
    query: worksByCategoryQuery,
    params: { category: "commercial" },
  });

  const instagram = settings?.instagramUrl;
  const phone = settings?.phone;
  const city = settings?.city;

  const featured: any[] = Array.isArray(featuredSection?.works)
    ? featuredSection.works
    : [];

  const heroSlides: HeroSlide[] = Array.isArray(hero?.slides)
    ? hero.slides
        .map((s: any): HeroSlide | null => {
          const img = s?.image ? urlFor(s.image).width(2400).url() : "";
          if (!img) return null;

          return {
            image: img,
            eyebrow: s?.eyebrow,
            title: s?.title,
            subtitle: s?.subtitle,
            primaryCta: {
              label: s?.primaryCta?.label || "СМОТРЕТЬ РАБОТЫ",
              href: s?.primaryCta?.href || "/works?type=designer",
            },
            secondaryCta: {
              label: s?.secondaryCta?.label || "СВЯЗАТЬСЯ",
              href: s?.secondaryCta?.href || "/contacts",
            },
            footerLeftLabel: s?.footerLeftLabel,
            footerProject: s?.footerProject,
          };
        })
        .filter((x: HeroSlide | null): x is HeroSlide => x !== null)
    : [];
    
  return (
    <>
      <HeroCarousel slides={heroSlides as any} />

      <FeaturedCarousel
        items={featured}
        eyebrow={featuredSection?.eyebrow}
        title={featuredSection?.title}
      />

      <HomeWorksTabs
        designerItems={designerItems}
        commercialItems={commercialItems}
      />

      <AboutSection
        name={settings?.fullName}
        city={city}
        bio={settings?.bio}
        portraitSanityImage={settings?.portrait}
        portraitFallbackSrc="/portrait.webp"
        instagramUrl={instagram}
        phone={phone}
      />

      <LeadCtaSection instagramUrl={instagram} phone={phone} city={city} />
    </>
  );
}
