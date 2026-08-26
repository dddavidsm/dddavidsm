import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT ?? 3000);
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/+$/, '');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

async function existingFile(pathname) {
  const clean = normalize(pathname)
    .replace(/^(\.\.[/\\])+/, '')
    .replace(/^[/\\]+/, '');
  const candidate = resolve(join(root, clean));
  if (!candidate.startsWith(root)) return null;

  const candidates = [candidate];
  if (!extname(candidate)) {
    candidates.push(join(candidate, 'index.html'));
    candidates.push(`${candidate}.html`);
  }

  for (const file of candidates) {
    try {
      const info = await stat(file);
      if (info.isFile()) return file;
    } catch {
      // Try the next static-export shape.
    }
  }
  return null;
}

async function sendFile(response, file, statusCode = 200) {
  const body = await readFile(file);
  response.statusCode = statusCode;
  response.setHeader('Content-Type', contentTypes[extname(file)] ?? 'application/octet-stream');
  response.setHeader('Cache-Control', 'no-store');
  response.end(body);
}

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    let route = pathname;

    if (basePath) {
      if (route === basePath) route = '/';
      else if (route.startsWith(`${basePath}/`)) route = route.slice(basePath.length);
      else {
        const notFound = await existingFile('/404.html');
        if (notFound) return sendFile(response, notFound, 404);
        response.statusCode = 404;
        return response.end('Not found');
      }
    }

    const file = await existingFile(route === '/' ? '/index.html' : route);
    if (file) return sendFile(response, file);

    const notFound = await existingFile('/404.html');
    if (notFound) return sendFile(response, notFound, 404);
    response.statusCode = 404;
    return response.end('Not found');
  } catch (error) {
    response.statusCode = 500;
    response.end(error instanceof Error ? error.message : 'Server error');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Static server ready at http://127.0.0.1:${port}${basePath}/`);
});
