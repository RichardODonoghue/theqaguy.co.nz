import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { Blog, getPublishedBlogs } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get('host') ?? '';
  const isProd = host === 'theqaguy.co.nz' || host === 'www.theqaguy.co.nz';

  // Match robots.ts: no sitemap for non‑prod hosts
  if (!isProd) return [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://theqaguy.co.nz';

  // Static, indexable routes (exclude /admin, /login)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/qa-blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/projects`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about-me`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Blog posts
  const blogs = await getPublishedBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: Blog) => ({
    url: `${baseUrl}/qa-blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt ?? blog.createdAt ?? Date.now()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
