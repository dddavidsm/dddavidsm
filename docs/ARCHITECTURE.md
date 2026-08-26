# Architecture

## Rendering model

Next.js App Router with Server Components by default. The only interactive client boundary in the core experience is the responsive navigation component.

## Routing

Project pages use `/work/[slug]` with `generateStaticParams()` and structured data from `lib/projects.ts`. Every case study is statically renderable.

## Content

`lib/projects.ts` is the source of truth for project metadata and case-study copy. Zod validates required fields and the build fails when content is malformed.

## Media

Project artwork is programmatic SVG/CSS. It is intentionally illustrative rather than a fabricated product screenshot. Private application interfaces are not reproduced.

## SEO

The root layout defines global metadata and Person structured data. Project pages produce unique metadata, canonical URLs, CreativeWork JSON-LD and dynamic OG images. Sitemap and robots are code-generated.
