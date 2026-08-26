import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const directory = '.lighthouseci';
const files = (await readdir(directory)).filter((file) => file.startsWith('lhr-') && file.endsWith('.json'));

if (files.length === 0) {
  throw new Error('No Lighthouse JSON reports found.');
}

for (const file of files) {
  const report = JSON.parse(await readFile(join(directory, file), 'utf8'));
  const categories = report.categories;
  const audits = report.audits;
  const score = (value) => Math.round((value ?? 0) * 100);

  console.log(`\nLighthouse: ${report.finalDisplayedUrl}`);
  console.log(`  Performance: ${score(categories.performance?.score)}`);
  console.log(`  Accessibility: ${score(categories.accessibility?.score)}`);
  console.log(`  Best Practices: ${score(categories['best-practices']?.score)}`);
  console.log(`  SEO: ${score(categories.seo?.score)}`);
  console.log(`  FCP: ${Math.round(audits['first-contentful-paint']?.numericValue ?? 0)} ms`);
  console.log(`  LCP: ${Math.round(audits['largest-contentful-paint']?.numericValue ?? 0)} ms`);
  console.log(`  Speed Index: ${Math.round(audits['speed-index']?.numericValue ?? 0)} ms`);
  console.log(`  TBT: ${Math.round(audits['total-blocking-time']?.numericValue ?? 0)} ms`);
  console.log(`  CLS: ${(audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3)}`);

  const opportunities = Object.values(audits)
    .filter((audit) => audit?.details?.type === 'opportunity' && (audit.details.overallSavingsMs ?? 0) > 50)
    .sort((a, b) => (b.details.overallSavingsMs ?? 0) - (a.details.overallSavingsMs ?? 0))
    .slice(0, 8);

  if (opportunities.length > 0) {
    console.log('  Opportunities:');
    for (const audit of opportunities) {
      console.log(`    - ${audit.title}: ~${Math.round(audit.details.overallSavingsMs)} ms`);
    }
  }
}
