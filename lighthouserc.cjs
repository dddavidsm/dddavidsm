const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/+$/, '');
const base = `http://127.0.0.1:3000${basePath}`;

module.exports = {
  ci: {
    collect: {
      url: [`${base}/`, `${base}/work/`, `${base}/work/structcad/`],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Static server ready',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
};
