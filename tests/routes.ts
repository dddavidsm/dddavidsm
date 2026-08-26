const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/+$/, '');

export function routeUrl(route: string) {
  const normalized = route.startsWith('/') ? route : `/${route}`;
  if (normalized === '/') return `${basePath}/`;
  return `${basePath}${normalized}`;
}
