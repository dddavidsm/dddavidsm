import { projectCollectionSchema, projects } from '../lib/projects';

const parsed = projectCollectionSchema.safeParse(projects);
if (!parsed.success) {
  console.error(parsed.error.format());
  process.exit(1);
}

const slugs = new Set(projects.map((project) => project.slug));
if (slugs.size !== projects.length) {
  console.error('Project slugs must be unique.');
  process.exit(1);
}

const forbiddenProjectNames = ['POEDAGAR Iberia', 'Vinclocktage', 'SOCOTEC Automation'];
const serialized = JSON.stringify(projects);
for (const forbidden of forbiddenProjectNames) {
  if (serialized.includes(forbidden)) {
    console.error(`Forbidden featured-project name detected: ${forbidden}`);
    process.exit(1);
  }
}

console.log(`Validated ${projects.length} project records.`);
