import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Firomsa Assefa Roba - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0B1120, #0F172A)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#F8FAFC',
            lineHeight: 1.1,
          }}
        >
          Firomsa Assefa Roba
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 'normal',
            color: '#94A3B8',
            marginBottom: 60,
          }}
        >
          Software Engineer & Full-Stack Developer
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#10B981',
            color: '#FFFFFF',
            padding: '20px 48px',
            borderRadius: '16px',
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          View Interactive Portfolio
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
