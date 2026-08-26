import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: absoluteUrl('/work'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
