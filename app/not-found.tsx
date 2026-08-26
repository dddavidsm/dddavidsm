import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found section-shell">
      <p className="eyebrow mono">404 / ROUTE NOT FOUND</p>
      <h1>This path does not belong to the system.</h1>
      <div className="not-found-links">
        <Link href="/">Home ↗</Link>
        <Link href="/work">Selected work ↗</Link>
      </div>
    </section>
  );
}
