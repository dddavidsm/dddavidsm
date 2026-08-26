import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/work/${project.slug}`} className="project-card-link" aria-label={`View ${project.title} case study`}>
        <div className="project-card-meta mono">
          <span>{project.index}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <ProjectVisual project={project} compact />
        <div className="project-card-copy">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </div>
      </Link>
    </article>
  );
}
