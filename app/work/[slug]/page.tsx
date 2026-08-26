import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ProjectVisual } from '@/components/ProjectVisual';
import { getNextProject, getProject, projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const projectUrl = absoluteUrl(`/work/${project.slug}`);
  const imageUrl = absoluteUrl(`/work/${project.slug}/opengraph-image`);
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: projectUrl },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      url: projectUrl,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study`,
      description: project.summary,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    creator: { '@type': 'Person', name: 'David Sánchez' },
    dateCreated: project.year,
    url: absoluteUrl(`/work/${project.slug}`),
    keywords: project.stack.join(', '),
  };

  return (
    <article className="case-study">
      <header className="project-hero section-shell">
        <div className="project-kicker mono">
          <span>{project.index}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="project-statement">{project.statement}</p>
        <dl className="project-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.slice(0, 4).join(' · ')}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </header>

      <div className="project-cover section-shell full-bleed-mobile">
        <ProjectVisual project={project} />
      </div>

      <section className="case-section section-shell two-col">
        <div>
          <p className="eyebrow mono">01 / OVERVIEW</p>
          <h2>Context</h2>
        </div>
        <div className="case-body">
          <p className="lead-copy">{project.context}</p>
        </div>
      </section>

      <section className="case-section section-shell two-col dark-panel">
        <div>
          <p className="eyebrow mono">02 / PROBLEM</p>
          <h2>What had to work.</h2>
        </div>
        <div className="case-body">
          <p className="lead-copy">{project.problem}</p>
          <p>{project.contribution}</p>
        </div>
      </section>

      <section className="case-section section-shell">
        <div className="section-intro">
          <p className="eyebrow mono">03 / SYSTEM</p>
          <h2>Architecture</h2>
        </div>
        <ArchitectureDiagram nodes={project.architecture} />
      </section>

      <section className="case-section section-shell challenges-section">
        <div className="section-intro">
          <p className="eyebrow mono">04 / TECHNICAL CHALLENGES</p>
          <h2>Where the engineering mattered.</h2>
        </div>
        <div className="challenge-grid">
          {project.challenges.map((challenge, index) => (
            <article key={challenge.title}>
              <span className="mono">0{index + 1}</span>
              <h3>{challenge.title}</h3>
              <p>{challenge.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section section-shell outcome-section">
        <div>
          <p className="eyebrow mono">05 / OUTCOME</p>
          <h2>Result</h2>
        </div>
        <div className="case-body">
          <p className="lead-copy">{project.outcome}</p>
          <ul className="inline-list mono" aria-label="Project technology">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.publicSource && project.sourceUrl ? (
            <a className="text-link" href={project.sourceUrl} target="_blank" rel="noreferrer">
              View repository ↗
            </a>
          ) : (
            <span className="private-note mono">SOURCE / PRIVATE</span>
          )}
        </div>
      </section>

      <Link className="next-project section-shell" href={`/work/${nextProject.slug}`}>
        <span className="eyebrow mono">NEXT PROJECT / {nextProject.index}</span>
        <strong>{nextProject.title}</strong>
        <span aria-hidden="true">↗</span>
      </Link>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </article>
  );
}
