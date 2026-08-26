export function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="architecture-diagram" aria-label={`Architecture: ${nodes.join(' to ')}`}>
      {nodes.map((node, index) => (
        <div className="architecture-node-wrap" key={node}>
          <div className="architecture-node">
            <span className="mono">0{index + 1}</span>
            <strong>{node}</strong>
          </div>
          {index < nodes.length - 1 ? <span className="architecture-arrow" aria-hidden="true">↓</span> : null}
        </div>
      ))}
    </div>
  );
}
