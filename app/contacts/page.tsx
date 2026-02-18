import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ContactsPageClient } from "@/components/ContactsPageClient";

export const metadata = {
  title: "Контакты — Индира Юсупова | Интерьерный фотограф",
  description: "Связаться с Индира Юсупова: Instagram, телефон. Алматы.",
};

export default async function ContactsPage() {
  const { data: settings } = await sanityFetch<any>({ query: settingsQuery });

  const instagramUrl = settings?.instagramUrl;
  const phone = settings?.phone;
  const city = settings?.city;
  const name = settings?.fullName;
  const tagline = settings?.tagline;

  const portraitUrl = settings?.portrait
    ? urlFor(settings.portrait).width(1400).url()
    : undefined;

  return (
    <ContactsPageClient
      name={name}
      tagline={tagline}
      city={city}
      phone={phone}
      instagramUrl={instagramUrl}
      portraitUrl={portraitUrl}
    />
  );
}
