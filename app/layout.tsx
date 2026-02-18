import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata = {
  title: "Индира Юсупова — интерьерный фотограф | Алматы",
  description:
    "Создаю истории вашего пространства. Съемка жилых и коммерческих интерьеров. Сотрудничество с дизайнерами и брендами. Алматы.",
  openGraph: {
    title: "Индира Юсупова — интерьерный фотограф | Алматы",
    description:
      "Портфолио интерьерной съемки: дизайнерские и коммерческие проекты. Алматы.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Индира Юсупова — интерьерный фотограф",
    areaServed: "Almaty",
    telephone: "+7 701 943 5553",
    sameAs: ["https://www.instagram.com/indira_yussupova_ph/"],
  };

  return (
    <html lang="ru">
      <body className="min-h-screen">
        <AppShell>{children}</AppShell>

        {/* schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
