import Scene from '@/components/SolarSystem/Scene';

export const metadata = {
    title: 'Cosmic View | AstroWeb',
    description: 'Interactive 3D Solar System',
};

export default function SolarSystemPage() {
    return (
        <main>
            <Scene />

            {/* Overlay UI */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                color: '#fbbf24',
                pointerEvents: 'none',
                fontFamily: 'var(--font-rozha)' // Ensure this font variable is available or fallback
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Cosmic View</h1>
                <p style={{ fontFamily: 'sans-serif', opacity: 0.7, fontSize: '0.9rem' }}>
                    Drag to Rotate • Scroll to Zoom
                </p>
            </div>

            <a href="/" style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                color: '#fff',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(5px)',
                fontSize: '0.9rem'
            }}>
                Return Home
            </a>
        </main>
    );
}
