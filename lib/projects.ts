import { z } from 'zod';

const projectSchema = z.object({
  slug: z.string().min(2),
  index: z.string().regex(/^\d{2}$/),
  title: z.string().min(2),
  shortTitle: z.string().min(2),
  year: z.string().regex(/^20\d{2}$/),
  category: z.string().min(2),
  role: z.string().min(2),
  status: z.string().min(2),
  publicSource: z.boolean(),
  sourceUrl: z.string().url().nullable(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  foreground: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  summary: z.string().min(40),
  statement: z.string().min(30),
  stack: z.array(z.string()).min(3),
  context: z.string().min(60),
  problem: z.string().min(60),
  contribution: z.string().min(60),
  architecture: z.array(z.string()).min(3),
  challenges: z.array(z.object({ title: z.string(), copy: z.string().min(40) })).min(2),
  outcome: z.string().min(60),
  visual: z.enum(['court', 'cad', 'building', 'mobile', 'agent']),
});

export type Project = z.infer<typeof projectSchema>;

export const projects: Project[] = [
  {
    slug: 'badia-padel-tour',
    index: '01',
    title: 'Badia Padel Tour',
    shortTitle: 'BPT',
    year: '2026',
    category: 'Full-Stack Product',
    role: 'Full-stack development',
    status: 'Public repository',
    publicSource: true,
    sourceUrl: 'https://github.com/dddavidsm/badiapadeltour-frontend-react',
    accent: '#d7ff38',
    foreground: '#11130d',
    summary:
      'A reservation product pairing a guest-facing React experience with a Laravel REST API, availability checks and a complete containerized local environment.',
    statement: 'Booking flows, product UX and API behaviour treated as one connected system.',
    stack: ['React 18', 'Vite', 'Laravel 11', 'PHP 8.2', 'MySQL', 'Docker', 'Filament'],
    context:
      'Badia Padel Tour is a full-stack padel reservation application. The repository combines the Laravel backend and a separate React frontend, including court discovery, filters, cart, checkout and post-purchase flow.',
    problem:
      'A reservation flow has to keep the guest experience simple while protecting the backend from invalid or conflicting time slots. The application also needed a repeatable environment for frontend, API and database development.',
    contribution:
      'I developed the product across the user-facing React flow and the Laravel API surface, including guest checkout, court filtering, cart behaviour and deployment-oriented Docker configuration.',
    architecture: ['React / Vite storefront', 'Laravel REST API', 'MySQL persistence', 'Docker Compose environment'],
    challenges: [
      {
        title: 'Availability before confirmation',
        copy: 'Checkout validates reservation availability on the server before a booking is accepted, keeping conflict rules out of the browser-only state.',
      },
      {
        title: 'Frontend / backend separation',
        copy: 'The React application remains independently buildable while the API exposes the data and checkout contracts required by the guest flow.',
      },
    ],
    outcome:
      'The project reached a coherent guest booking journey with searchable courts, local cart state, server-side availability validation and a reproducible multi-service development setup.',
    visual: 'court',
  },
  {
    slug: 'structcad',
    index: '02',
    title: 'StructCad',
    shortTitle: 'StructCad',
    year: '2026',
    category: 'Engineering Software',
    role: 'Full-stack product engineering',
    status: 'Private engineering project',
    publicSource: false,
    sourceUrl: null,
    accent: '#f26a2e',
    foreground: '#15110e',
    summary:
      'A structural inspection workspace for documenting reinforced-concrete elements on canvas and generating technical DXF drawings from inspection data.',
    statement: 'Turning field inspection input into consistent technical geometry and exportable drawings.',
    stack: ['React 19', 'Vite', 'FastAPI', 'Python', 'Supabase', 'ezdxf', 'Shapely', 'Docker'],
    context:
      'StructCad is an engineering application for structural inspections. It models pillars, beams, slabs, footings and stairs, combines forms with a visual canvas, and exports technical drawings through a Python DXF engine.',
    problem:
      'Inspection data is geometric, stateful and visual. The difficult part is keeping user edits, canvas representation and generated DXF output aligned while supporting very different structural element types and screen sizes.',
    contribution:
      'I worked across the React workspace, structural state, responsive editor behaviour and Python export pipeline, including reinforcement geometry, stirrups, damaged zones, view fitting and DXF generation workflows.',
    architecture: ['React inspection workspace', 'FastAPI generation endpoints', 'Python DXF geometry engine', 'Supabase history and access layer'],
    challenges: [
      {
        title: 'Geometry consistency',
        copy: 'Canvas state and exported CAD geometry need to express the same reinforcement layout, damaged areas and dimensions instead of drifting into two separate representations.',
      },
      {
        title: 'Canvas-first responsive UI',
        copy: 'The editor adapts from fixed desktop properties to overlay and bottom-sheet patterns so the technical drawing remains the primary workspace on smaller screens.',
      },
      {
        title: 'Specialized export pipeline',
        copy: 'FastAPI coordinates a Python engine built on ezdxf and Shapely to generate CAD-ready output for multiple structural element families.',
      },
    ],
    outcome:
      'The application supports a practical inspection-to-DXF workflow with reusable structural models, responsive editing, cloud-backed history and production deployment paths for frontend and backend.',
    visual: 'cad',
  },
  {
    slug: 'eedif',
    index: '03',
    title: 'EEDIF',
    shortTitle: 'EEDIF',
    year: '2026',
    category: 'Offline-First Inspection Platform',
    role: 'Full-stack product engineering',
    status: 'Private engineering project',
    publicSource: false,
    sourceUrl: null,
    accent: '#5aa7ff',
    foreground: '#0c1520',
    summary:
      'A tablet-first PWA for technical building inspections, built around local-first project persistence, plan annotation and professional document export.',
    statement: 'Field software designed to keep working when connectivity is unreliable or expensive.',
    stack: ['React 19', 'TypeScript', 'Vite', 'React-Konva', 'Dexie / IndexedDB', 'Supabase', 'PWA', 'jsPDF'],
    context:
      'EEDIF is an inspection platform for field teams documenting projects, zones, croquis, lesions, photographs and observations. It is deliberately tablet-first and offline-first rather than assuming a continuous network connection.',
    problem:
      'Large inspection projects contain visual and document-heavy data. Reloading entire projects from the network is slow and creates avoidable transfer costs, while field use cannot rely on stable connectivity.',
    contribution:
      'I worked on the local-first architecture, inspection workspace, canvas behaviour, project persistence and export flows, with IndexedDB acting as the primary local source of truth and Supabase used as an optional synchronization layer.',
    architecture: ['React / TypeScript PWA', 'Dexie + IndexedDB local source of truth', 'Optional Supabase synchronization', 'Worker-assisted PDF / ZIP / JSON exports'],
    challenges: [
      {
        title: 'Local-first data model',
        copy: 'Projects are persisted locally through Dexie so reopening an inspection does not require pulling the complete project payload from the server each time.',
      },
      {
        title: 'Visual inspection state',
        copy: 'React-Konva supports plan-based annotation while the application also handles zones that do not require a drawing, keeping both workflows inside one domain model.',
      },
      {
        title: 'Heavy exports without blocking the UI',
        copy: 'Document and archive generation is separated from the main interaction path, including a background worker for export-oriented processing.',
      },
    ],
    outcome:
      'EEDIF evolved into a resilient inspection PWA that keeps project work available locally, limits unnecessary network dependency and can produce structured deliverables from field data.',
    visual: 'building',
  },
  {
    slug: 'hclab-mobile',
    index: '04',
    title: 'HCLab Mobile',
    shortTitle: 'HCLab',
    year: '2026',
    category: 'Mobile Application',
    role: 'Mobile product development',
    status: 'Private enterprise project',
    publicSource: false,
    sourceUrl: null,
    accent: '#9be0d0',
    foreground: '#0e1b18',
    summary:
      'A Flutter mobile and tablet client that brings laboratory documents, tests, requests, notifications and account workflows into one secure application.',
    statement: 'Enterprise workflows redesigned for a touch-first mobile and tablet context.',
    stack: ['Flutter', 'Dart', 'Dio', 'GoRouter', 'Secure Storage', 'Local Authentication', 'Android', 'iOS'],
    context:
      'HCLab Mobile is a Flutter client for a laboratory platform. It consolidates authentication, test consultation, documents, requests, budgets, calendar, notifications and guided help into a single mobile experience.',
    problem:
      'The application has to translate a broad existing service surface into reliable touch-first flows while handling persistent sessions, secure credential storage, optional biometrics and responsive layouts across phones and tablets.',
    contribution:
      'I worked on the Flutter client architecture and user flows, including session restoration, reusable responsive components, secure local persistence, biometric access and mobile/tablet validation.',
    architecture: ['Feature-oriented Flutter client', 'Dio HTTP and cookie session layer', 'Secure local credential storage', 'Shared responsive presentation components'],
    challenges: [
      {
        title: 'Session reliability',
        copy: 'The client persists session state locally but validates it against the service before restoring access, avoiding a purely optimistic login state.',
      },
      {
        title: 'Biometric access',
        copy: 'Optional device authentication is layered on top of secure storage so biometric unlock protects the path to stored credentials rather than replacing server authentication.',
      },
      {
        title: 'Phone and tablet layouts',
        copy: 'Reusable presentation components reduce overflow risk and keep document-heavy screens usable from narrow phones through landscape tablets.',
      },
    ],
    outcome:
      'The client provides a coherent mobile surface for document and laboratory workflows with secure session handling, device-level authentication options and responsive shared UI primitives.',
    visual: 'mobile',
  },
  {
    slug: 'hdsolutions',
    index: '05',
    title: 'HDSolutions',
    shortTitle: 'HDSolutions',
    year: '2025',
    category: 'AI-Enabled Web Product',
    role: 'Collaborative full-stack development',
    status: 'Collaborative private repository',
    publicSource: false,
    sourceUrl: null,
    accent: '#d4b5ff',
    foreground: '#171020',
    summary:
      'A collaborative React and Node.js product integrating an AI-assisted WhatsApp bot with automated scheduling through Google Calendar.',
    statement: 'A practical example of language models connected to real tools instead of isolated chat UI.',
    stack: ['React 18', 'Node.js', 'Express', 'OpenAI API', 'WhatsApp / Baileys', 'Google Calendar API'],
    context:
      'HDSolutions is a collaborative web project by Hugo and David. Alongside the React site, its backend connects a WhatsApp automation flow with an OpenAI model and Google Calendar APIs.',
    problem:
      'A useful AI assistant needs more than generated text: it has to receive messages, preserve application logic and connect model output to real scheduling tools without exposing secrets in the client.',
    contribution:
      'I contributed to the full-stack product and its automation architecture, working across the React experience and Node/Express backend integrations used by the messaging and scheduling workflow.',
    architecture: ['React web client', 'Node.js / Express backend', 'OpenAI model integration', 'WhatsApp and Calendar tool connections'],
    challenges: [
      {
        title: 'Tool-connected AI',
        copy: 'The model sits inside a backend workflow that can connect conversational input with external capabilities rather than running as a frontend-only chat demo.',
      },
      {
        title: 'Separation of secrets',
        copy: 'Provider credentials and OAuth-sensitive integrations belong to the backend process, keeping browser code independent from private service configuration.',
      },
    ],
    outcome:
      'The project demonstrates a compact AI-enabled product architecture: a web interface, backend orchestration, conversational messaging and external scheduling integrated as one workflow.',
    visual: 'agent',
  },
];

export const projectCollectionSchema = z.array(projectSchema).min(4);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
