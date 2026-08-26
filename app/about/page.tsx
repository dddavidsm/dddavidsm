import type { Metadata } from 'next';
import Link from 'next/link';
import { profile } from '@/lib/profile';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About David Sánchez, a Full-Stack Developer working across product engineering, AI-enabled workflows and web systems.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <section className="about-page section-shell">
      <header className="index-hero about-hero">
        <p className="eyebrow mono">ABOUT / PROFILE</p>
        <h1>Engineering across layers, without losing sight of the product.</h1>
        <p>
          I am a Full-Stack Developer focused on building useful software: web applications,
          engineering tools, mobile workflows and AI-enabled systems.
        </p>
      </header>

      <div className="about-grid">
        <section>
          <p className="eyebrow mono">WORKING APPROACH</p>
          <h2>Understand the workflow first.</h2>
          <p>
            I prefer to start from the real task, constraints and data flow, then choose the
            smallest architecture that can support them cleanly. That usually means keeping client
            code focused, making server boundaries explicit and treating performance and
            accessibility as implementation requirements rather than finishing passes.
          </p>
        </section>
        <section>
          <p className="eyebrow mono">AI</p>
          <h2>Use models where they create leverage.</h2>
          <p>
            AI is a development specialization, not a replacement identity. I use language models
            for engineering workflows and integrate them into products when tool calling, structured
            outputs, automation or natural-language interfaces solve a real problem.
          </p>
        </section>
        <section>
          <p className="eyebrow mono">COMMERCE</p>
          <h2>Storefront engineering beyond theme styling.</h2>
          <p>
            My Shopify work spans Liquid, sections, snippets, product and variant systems, media
            handling, technical SEO, structured data and performance — with the theme treated as a
            maintainable software product.
          </p>
        </section>
        <section>
          <p className="eyebrow mono">EDUCATION</p>
          <h2>{profile.education.program}</h2>
          <p>
            {profile.education.school}
            <br />
            {profile.education.period}
          </p>
        </section>
      </div>

      <div className="about-links">
        <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <Link className="text-link" href="/resume">
          Resume ↗
        </Link>
        <a className="text-link" href={`mailto:${profile.email}`}>
          Email ↗
        </a>
      </div>
    </section>
  );
}
