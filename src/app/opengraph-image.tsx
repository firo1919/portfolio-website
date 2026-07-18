import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const alt = 'Firomsa Assefa Roba - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Read local image file and convert to base64
  const iconData = readFileSync(join(process.cwd(), 'src', 'app', 'icon.jpg'));
  const iconBase64 = `data:image/jpeg;base64,${iconData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0B1120, #0F172A)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
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
              background: '#10B981', // Tailwind Mint Primary
              color: '#FFFFFF',
              padding: '20px 48px',
              borderRadius: '16px',
              fontSize: 32,
              fontWeight: 'bold',
              width: '450px',
            }}
          >
            View Interactive Portfolio
          </div>
        </div>
        
        {/* Profile Image */}
        <div style={{ display: 'flex', marginLeft: '40px' }}>
          <img
            src={iconBase64}
            alt="Firomsa Assefa Roba"
            width={320}
            height={320}
            style={{
              borderRadius: '50%',
              border: '8px solid #10B981',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
