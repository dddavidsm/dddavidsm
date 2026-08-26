import Link from 'next/link';
import { profile } from '@/lib/profile';

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-kicker mono">CONTACT / 2026</div>
      <h2>Build the next useful thing.</h2>
      <p>
        Full-stack product work, engineering software, AI-enabled workflows and commerce systems.
      </p>
      <div className="footer-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <Link href="/resume">Resume ↗</Link>
      </div>
      <div className="footer-bottom mono">
        <span>DAVID SÁNCHEZ</span>
        <span>FULL-STACK DEVELOPER</span>
      </div>
    </footer>
  );
}
