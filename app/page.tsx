import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { profile } from '@/lib/profile';
import { projects } from '@/lib/projects';

export default function HomePage() {
  return (
    <>
      <section className="hero section-shell">
        <div className="hero-rail mono">
          <span>FULL-STACK / AI-ENABLED / PRODUCT</span>
          <span>SELECTED WORK 2025—2026</span>
        </div>
        <div className="hero-title-wrap">
          <p className="hero-name">DAVID SÁNCHEZ</p>
          <h1>
            FULL-STACK
            <span>DEVELOPER</span>
          </h1>
        </div>
        <div className="hero-bottom">
          <p>{profile.intro}</p>
          <div className="hero-actions mono">
            <Link href="/work">View work ↘</Link>
            <Link href="/resume">Resume ↗</Link>
          </div>
        </div>
        <div className="hero-grid-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="selected-work section-shell" aria-labelledby="selected-work-title">
        <div className="section-intro">
          <p className="eyebrow mono">SELECTED WORK / 05</p>
          <h2 id="selected-work-title">Software built around real workflows.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        id="expertise"
        className="capabilities section-shell"
        aria-labelledby="capabilities-title"
      >
        <div className="section-intro sticky-intro">
          <p className="eyebrow mono">EXPERTISE / 04</p>
          <h2 id="capabilities-title">From interface to delivery.</h2>
          <p className="section-lead">
            The portfolio is intentionally broader than a framework list: each area describes the
            layer of a product I can own.
          </p>
        </div>
        <div className="capability-list">
          {profile.capabilities.map((capability) => (
            <article className="capability" key={capability.index}>
              <div className="capability-head">
                <span className="mono">{capability.index}</span>
                <h3>{capability.title}</h3>
              </div>
              <p>{capability.copy}</p>
              <ul className="inline-list mono" aria-label={`${capability.title} technologies`}>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-band section-shell" aria-labelledby="ai-title">
        <p className="eyebrow mono">AI-ENABLED DEVELOPMENT</p>
        <h2 id="ai-title">
          Models are most useful when they can act inside a well-designed software system.
        </h2>
        <div className="ai-copy-grid">
          <p>
            I use language models across research, architecture, implementation, testing and
            automation — and integrate them as product capabilities when a workflow benefits from
            it.
          </p>
          <p className="mono">
            LLM INTEGRATION / TOOL CALLING / STRUCTURED OUTPUTS / AGENTIC WORKFLOWS / CONTEXT
            ENGINEERING
          </p>
        </div>
      </section>

      <section className="about-strip section-shell">
        <p className="eyebrow mono">ABOUT</p>
        <h2>Product-minded engineering, with enough range to follow the problem across layers.</h2>
        <Link href="/about" className="text-link">
          About & working approach ↗
        </Link>
      </section>
    </>
  );
}
