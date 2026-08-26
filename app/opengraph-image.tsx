import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f1efe8',
        color: '#111',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 2 }}
      >
        <span>DAVID SÁNCHEZ</span>
        <span>PORTFOLIO / 2026</span>
      </div>
      <div style={{ fontSize: 110, lineHeight: 0.88, fontWeight: 700, letterSpacing: -5 }}>
        FULL-STACK
        <br />
        DEVELOPER
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ width: 300, height: 20, background: '#111' }} />
        <span style={{ fontSize: 20 }}>WEB / ENGINEERING / AI</span>
      </div>
    </div>,
    size,
  );
}
