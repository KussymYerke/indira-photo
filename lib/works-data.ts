export type WorkCategory = "designer" | "commercial";

export type WorkProject = {
  slug: string;
  title: string;
  category: WorkCategory;
  excerpt: string;
  location?: string;
year?: number | string;
  images: { src: string; alt: string }[];
};

// Временные данные (потом заменишь на Sanity)
export const projects: WorkProject[] = [
  // ---- DEMO WORKS (placeholders) ----
  {
    slug: "minimal-apartment-light",
    title: "Минимализм · Свет и воздух",
    category: "designer",
    location: "Алматы",
    year: 2025,
    excerpt: "Светлый жилой интерьер с акцентом на фактуры и ритм деталей.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
        alt: "Interior 1",
      },
      {
        src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400&q=80",
        alt: "Interior 2",
      },
      {
        src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2400&q=80",
        alt: "Interior 3",
      },
    ],
  },
  {
    slug: "warm-kitchen-wood",
    title: "Кухня · Теплое дерево",
    category: "designer",
    location: "Алматы",
    year: 2024,
    excerpt: "Тёплая палитра, натуральные материалы и чистая композиция.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=2400&q=80",
        alt: "Kitchen 1",
      },
      {
        src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=2400&q=80",
        alt: "Kitchen 2",
      },
      {
        src: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&w=2400&q=80",
        alt: "Kitchen 3",
      },
    ],
  },
  {
    slug: "soft-bedroom-neutral",
    title: "Спальня · Нейтральные тона",
    category: "designer",
    location: "Алматы",
    year: 2025,
    excerpt: "Нейтральная гамма и мягкий свет для спокойного настроения.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2400&q=80",
        alt: "Bedroom 1",
      },
      {
        src: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=2400&q=80",
        alt: "Bedroom 2",
      },
      {
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
        alt: "Bedroom 3",
      },
    ],
  },
  {
    slug: "living-room-geometry",
    title: "Гостиная · Геометрия",
    category: "designer",
    location: "Алматы",
    year: 2023,
    excerpt: "Геометрия линий и баланс цветовых акцентов.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=80",
        alt: "Living 1",
      },
      {
        src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2400&q=80",
        alt: "Living 2",
      },
      {
        src: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=2400&q=80",
        alt: "Living 3",
      },
    ],
  },

  {
    slug: "restaurant-evening-light",
    title: "Ресторан · Вечерний свет",
    category: "commercial",
    location: "Алматы",
    year: 2024,
    excerpt: "Тёплый вечерний свет и атмосфера для гостевого опыта.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2400&q=80",
        alt: "Restaurant 1",
      },
      {
        src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2400&q=80",
        alt: "Restaurant 2",
      },
      {
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=80",
        alt: "Restaurant 3",
      },
    ],
  },
  {
    slug: "hotel-suite-calm",
    title: "Отель · Номер люкс",
    category: "commercial",
    location: "Алматы",
    year: 2025,
    excerpt: "Чистая подача пространства для бронирований и рекламы.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2400&q=80",
        alt: "Hotel 1",
      },
      {
        src: "https://images.unsplash.com/photo-1560067174-8943bd8f2661?auto=format&fit=crop&w=2400&q=80",
        alt: "Hotel 2",
      },
      {
        src: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=2400&q=80",
        alt: "Hotel 3",
      },
    ],
  },
  {
    slug: "showroom-brand-space",
    title: "Шоурум · Пространство бренда",
    category: "commercial",
    location: "Алматы",
    year: 2023,
    excerpt:
      "Съемка для каталога и социальных сетей: чисто, структурно, выразительно.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400&q=80",
        alt: "Showroom 1",
      },
      {
        src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2400&q=80",
        alt: "Showroom 2",
      },
      {
        src: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=2400&q=80",
        alt: "Showroom 3",
      },
    ],
  },
  {
    slug: "cafe-morning",
    title: "Кафе · Утро",
    category: "commercial",
    location: "Алматы",
    year: 2024,
    excerpt: "Лёгкий утренний свет и детали для меню, сайта и рекламы.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2400&q=80",
        alt: "Cafe 1",
      },
      {
        src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=2400&q=80",
        alt: "Cafe 2",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2400&q=80",
        alt: "Cafe 3",
      },
    ],
  },
  // ---- /DEMO WORKS ----
];

export const byCategory = (category: WorkCategory) =>
  projects.filter((p) => p.category === category);

export const findBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
