# David Sánchez — Full-Stack Developer Portfolio

A production-oriented personal portfolio built as a software project rather than a single landing page.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript (`strict: true`)
- CSS design tokens and component-level layout classes
- Zod content validation
- Playwright + axe-core
- Lighthouse CI
- GitHub Actions
- Vercel-ready deployment

## Information architecture

- `/` — editorial home
- `/work` — selected work index
- `/work/[slug]` — five evidence-based case studies
- `/about` — concise professional profile
- `/resume` — print-friendly resume
- custom 404, sitemap, robots, manifest and dynamic Open Graph images

## Content model

Project copy lives in `lib/projects.ts` and is validated during build. Case studies are generated from structured records rather than duplicated page implementations.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run validate:content
npm run build
npm run test:e2e
```

## Design principles

The visual language is **Editorial Engineering**: large typography, restrained technical labels, warm neutral surfaces, project-specific accents and programmatic technical artwork. No terminal gimmicks, skill percentages or dashboard-style card grids.

## Privacy

Private repositories were used only as evidence sources. No secrets, private endpoints, credentials or private source code are published here. Public source links are shown only when the underlying repository is public.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL on Vercel. The application contains no runtime database or external CMS dependency.
