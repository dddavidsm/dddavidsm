'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/#expertise', label: 'Expertise' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="David Sánchez — Home">
        <span>DS</span>
        <span className="brand-name">David Sánchez</span>
      </Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="site-navigation" className={open ? 'nav nav-open' : 'nav'} aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
        ))}
        <a href="https://github.com/dddavidsm" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>GitHub ↗</a>
      </nav>
    </header>
  );
}
