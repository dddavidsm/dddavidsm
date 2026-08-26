import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dddavidsm.vercel.app';
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
