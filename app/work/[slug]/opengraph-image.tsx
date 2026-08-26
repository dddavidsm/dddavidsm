import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/projects';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f1efe8',
        color: '#111111',
        padding: 62,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 2 }}
      >
        <span>DAVID SÁNCHEZ</span>
        <span>
          {project.index} / {project.year}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ fontSize: 24, textTransform: 'uppercase', letterSpacing: 3 }}>
          {project.category}
        </span>
        <div style={{ fontSize: 92, lineHeight: 0.95, fontWeight: 700 }}>{project.title}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ width: 250, height: 18, background: project.accent }} />
        <span style={{ fontSize: 20 }}>FULL-STACK DEVELOPER</span>
      </div>
    </div>,
    size,
  );
}
