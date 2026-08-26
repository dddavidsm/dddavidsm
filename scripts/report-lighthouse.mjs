import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const directory = '.lighthouseci';
const files = (await readdir(directory)).filter((file) => {
  return file.startsWith('lhr-') && file.endsWith('.json');
});

if (files.length === 0) {
  throw new Error('No Lighthouse JSON reports found.');
}

for (const file of files) {
  const report = JSON.parse(await readFile(join(directory, file), 'utf8'));
  const categories = report.categories;
  const audits = report.audits;
  const score = (value) => Math.round((value ?? 0) * 100);
  const ms = (id) => Math.round(audits[id]?.numericValue ?? 0);

  console.log(`\nLighthouse: ${report.finalDisplayedUrl}`);
  console.log(`  Performance: ${score(categories.performance?.score)}`);
  console.log(`  Accessibility: ${score(categories.accessibility?.score)}`);
  console.log(`  Best Practices: ${score(categories['best-practices']?.score)}`);
  console.log(`  SEO: ${score(categories.seo?.score)}`);
  console.log(`  FCP: ${ms('first-contentful-paint')} ms`);
  console.log(`  LCP: ${ms('largest-contentful-paint')} ms`);
  console.log(`  Speed Index: ${ms('speed-index')} ms`);
  console.log(`  TBT: ${ms('total-blocking-time')} ms`);
  console.log(`  CLS: ${(audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3)}`);

  const opportunities = Object.values(audits)
    .filter((audit) => {
      const savings = audit?.details?.overallSavingsMs ?? 0;
      return audit?.details?.type === 'opportunity' && savings > 50;
    })
    .sort((a, b) => {
      return (b.details.overallSavingsMs ?? 0) - (a.details.overallSavingsMs ?? 0);
    })
    .slice(0, 8);

  if (opportunities.length > 0) {
    console.log('  Opportunities:');
    for (const audit of opportunities) {
      const savings = Math.round(audit.details.overallSavingsMs);
      console.log(`    - ${audit.title}: ~${savings} ms`);
    }
  }
}
