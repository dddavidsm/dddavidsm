import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Selected full-stack, engineering, mobile and AI-enabled projects by David Sánchez.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <section className="work-index section-shell">
      <header className="index-hero">
        <p className="eyebrow mono">WORK / {String(projects.length).padStart(2, '0')}</p>
        <h1>Selected systems, not demo cards.</h1>
        <p>Full-stack products, engineering software, offline-first field tooling, mobile development and AI-connected workflows.</p>
      </header>
      <div className="project-list">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
  );
}
