import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // потом заменишь на домен
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/works`, lastModified: new Date() },
    { url: `${base}/contacts`, lastModified: new Date() },
  ];
}
