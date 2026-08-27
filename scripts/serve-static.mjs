import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

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

const compressibleExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.svg',
  '.txt',
  '.webmanifest',
  '.xml',
]);

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

async function sendFile(request, response, file, statusCode = 200) {
  const body = await readFile(file);
  const extension = extname(file);
  const acceptsGzip = /(?:^|,|\s)gzip(?:,|\s|$)/i.test(\n    request.headers['accept-encoding'] ?? '',\n  );
  const shouldCompress =
    acceptsGzip && compressibleExtensions.has(extension) && body.byteLength >= 1024;
  const isImmutableAsset = file.includes(\n    `${join('_next', 'static')}${process.platform === 'win32' ? '\\' : '/'}`,\n  );

  response.statusCode = statusCode;
  response.setHeader('Content-Type', contentTypes[extension] ?? 'application/octet-stream');
  response.setHeader('Vary', 'Accept-Encoding');
  response.setHeader(
    'Cache-Control',
    isImmutableAsset ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
  );

  if (shouldCompress) {
    response.setHeader('Content-Encoding', 'gzip');
    response.end(gzipSync(body, { level: 6 }));
    return;
  }

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
        if (notFound) return sendFile(request, response, notFound, 404);
        response.statusCode = 404;
        return response.end('Not found');
      }
    }

    const file = await existingFile(route === '/' ? '/index.html' : route);
    if (file) return sendFile(request, response, file);

    const notFound = await existingFile('/404.html');
    if (notFound) return sendFile(request, response, notFound, 404);
    response.statusCode = 404;
    return response.end('Not found');
  } catch (error) {
    response.statusCode = 500;
    response.end(error instanceof Error ? error.message : 'Server error');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Static server ready at http://127.0.0.1:${port}${basePath}/`);
});
