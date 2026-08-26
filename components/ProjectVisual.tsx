import type { CSSProperties } from 'react';

import type { Project } from '@/lib/projects';

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const common = { '--accent': project.accent, '--ink': project.foreground } as CSSProperties;

  return (
    <div className={`project-visual visual-${project.visual} ${compact ? 'visual-compact' : ''}`} style={common} aria-hidden="true">
      {project.visual === 'court' && (
        <svg viewBox="0 0 1200 720" role="img">
          <rect x="110" y="92" width="980" height="536" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
          <line x1="600" y1="92" x2="600" y2="628" stroke="currentColor" strokeWidth="4" />
          <line x1="110" y1="360" x2="1090" y2="360" stroke="currentColor" strokeWidth="3" strokeDasharray="14 18" />
          <rect x="266" y="176" width="668" height="368" rx="180" fill="none" stroke="currentColor" strokeWidth="2" opacity=".45" />
          <circle cx="812" cy="252" r="36" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
          <path d="M210 562H416" stroke="currentColor" strokeWidth="12" />
          <path d="M788 158H990" stroke="currentColor" strokeWidth="12" />
        </svg>
      )}
      {project.visual === 'cad' && (
        <svg viewBox="0 0 1200 720" role="img">
          <defs><pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" opacity=".16" /></pattern></defs>
          <rect width="1200" height="720" fill="url(#cadGrid)" />
          <rect x="250" y="128" width="700" height="464" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="312" y="190" width="576" height="340" rx="14" fill="none" stroke="currentColor" strokeWidth="3" />
          {[360, 460, 560, 660, 760, 840].map((x) => <circle key={x} cx={x} cy="232" r="14" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />)}
          {[360, 460, 560, 660, 760, 840].map((x) => <circle key={`${x}-b`} cx={x} cy="488" r="14" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />)}
          <path d="M212 128V592M190 128H230M190 592H230" stroke="currentColor" strokeWidth="2" />
          <path d="M250 628H950M250 608V648M950 608V648" stroke="currentColor" strokeWidth="2" />
          <text x="102" y="370" fill="currentColor" fontSize="22" transform="rotate(-90 102 370)">STRUCTURAL SECTION</text>
        </svg>
      )}
      {project.visual === 'building' && (
        <svg viewBox="0 0 1200 720" role="img">
          <path d="M256 602V208L460 122L664 208V602Z" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M664 602V272L890 188V602Z" fill="none" stroke="currentColor" strokeWidth="4" />
          {[274, 350, 426, 502].map((y) => <line key={y} x1="256" y1={y} x2="664" y2={y} stroke="currentColor" strokeWidth="2" opacity=".55" />)}
          <circle cx="520" cy="338" r="42" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
          <path d="M520 380V518M520 518L462 558M520 518L582 558" stroke="currentColor" strokeWidth="3" strokeDasharray="10 10" />
          <rect x="760" y="322" width="196" height="124" rx="14" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M790 362H924M790 398H888" stroke="currentColor" strokeWidth="12" />
        </svg>
      )}
      {project.visual === 'mobile' && (
        <svg viewBox="0 0 1200 720" role="img">
          <rect x="410" y="76" width="380" height="568" rx="54" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="452" y="128" width="296" height="90" rx="20" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
          <rect x="452" y="248" width="296" height="116" rx="20" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="452" y="390" width="136" height="154" rx="20" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="612" y="390" width="136" height="154" rx="20" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="600" cy="602" r="12" fill="currentColor" />
          <path d="M160 190H350M160 238H310M850 444H1040M890 492H1040" stroke="currentColor" strokeWidth="12" />
        </svg>
      )}
      {project.visual === 'agent' && (
        <svg viewBox="0 0 1200 720" role="img">
          <circle cx="600" cy="360" r="92" fill="var(--accent)" stroke="currentColor" strokeWidth="4" />
          {[[260,180],[938,182],[248,548],[950,544]].map(([x,y], i) => <g key={i}><circle cx={x} cy={y} r="56" fill="none" stroke="currentColor" strokeWidth="3"/><line x1="600" y1="360" x2={x} y2={y} stroke="currentColor" strokeWidth="3" strokeDasharray="12 12" /></g>)}
          <path d="M560 340H640M560 380H618" stroke="currentColor" strokeWidth="12" />
          <path d="M232 180H288M910 182H966M220 548H276M922 544H978" stroke="currentColor" strokeWidth="8" />
        </svg>
      )}
      <span className="visual-label mono">{project.index} / {project.shortTitle}</span>
    </div>
  );
}
