import type { Metadata } from 'next';
import { profile } from '@/lib/profile';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Print-friendly resume for David Sánchez, Full-Stack Developer.',
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return (
    <article className="resume-page">
      <header>
        <div><p className="mono">DAVID SÁNCHEZ</p><h1>Full-Stack Developer</h1></div>
        <div className="resume-contact mono"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.github}>github.com/dddavidsm</a></div>
      </header>
      <section><h2>Profile</h2><p>{profile.intro}</p></section>
      <section>
        <h2>Selected projects</h2>
        {projects.slice(0, 5).map((project) => (
          <div className="resume-row" key={project.slug}><div><strong>{project.title}</strong><span>{project.category}</span></div><div><p>{project.summary}</p><span className="mono">{project.stack.slice(0, 5).join(' · ')}</span></div></div>
        ))}
      </section>
      <section><h2>Capabilities</h2><div className="resume-capabilities">{profile.capabilities.map((item) => <div key={item.index}><strong>{item.title}</strong><p>{item.items.join(' · ')}</p></div>)}</div></section>
      <section><h2>Education</h2><div className="resume-row"><div><strong>{profile.education.program}</strong><span>{profile.education.period}</span></div><div><p>{profile.education.school}</p></div></div></section>
      <p className="resume-note mono">PRINT / SAVE AS PDF FROM THE BROWSER</p>
    </article>
  );
}
