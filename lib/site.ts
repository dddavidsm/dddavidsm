const rawOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://dddavidsm.github.io';
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const siteOrigin = rawOrigin.replace(/\/+$/, '');
export const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/+$/, '');
export const siteUrl = `${siteOrigin}${basePath}`;

export function withBasePath(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!basePath) return normalized;
  if (normalized === '/') return `${basePath}/`;
  return `${basePath}${normalized}`;
}

export function absoluteUrl(path = '/') {
  return `${siteOrigin}${withBasePath(path)}`;
}
