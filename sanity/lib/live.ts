// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { defineLive } from "next-sanity/live";
import { client } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
};

// получаем "сырой" sanityFetch от next-sanity
const live = defineLive({ client });

// оставляем SanityLive как есть
export const SanityLive = live.SanityLive;

// ✅ наша типизированная обёртка:
// теперь generic <T> означает тип data, а не тип query
export async function sanityFetch<T = any>(
  options: SanityFetchOptions,
): Promise<{ data: T }> {
  return (await live.sanityFetch(options as any)) as { data: T };
}
