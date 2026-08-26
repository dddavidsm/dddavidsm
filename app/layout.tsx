import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { profile } from '@/lib/profile';
import '@/styles/globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dddavidsm.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'David Sánchez | Full-Stack Developer',
    template: '%s | David Sánchez',
  },
  description: profile.intro,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'David Sánchez — Full-Stack Developer',
    title: 'David Sánchez | Full-Stack Developer',
    description: profile.intro,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Sánchez | Full-Stack Developer',
    description: profile.intro,
  },
  icons: { icon: '/icon.svg' },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f1efe8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    sameAs: [profile.github],
    knowsAbout: [
      'Full-stack development',
      'React',
      'TypeScript',
      'Laravel',
      'Artificial Intelligence',
      'Large Language Models',
      'AI-assisted development',
      'Shopify',
      'Liquid',
    ],
  };

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
