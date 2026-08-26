import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'David Sánchez — Full-Stack Developer',
    short_name: 'David Sánchez',
    description: 'Portfolio of David Sánchez, Full-Stack Developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f1efe8',
    theme_color: '#f1efe8',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
