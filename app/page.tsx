import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{interactiveStyles}</style>
      <div style={styles.outerContainer}>
        {/* CSS Sunset Landscape Background */}
        <div style={styles.mountainScene}>
          <div className="sun"></div>
          <div className="mountains-back"></div>
          <div className="mountains-front"></div>
        </div>

        {/* Glass Container with Enhanced Shadow */}
        <div style={styles.glassContainer}>
          {/* Neon Title with Fast Bright Blink Animation */}
          <h1 className="neon-blink-fast" style={styles.title}>
            Supra-Vercel Sync
          </h1>
          
          <p className="description-text" style={styles.description}>
           "Experience the synergy of modern web development: a secure, data-driven student gateway powered by Supabase backend logic and seamless Vercel cloud synchronization."
          </p>

          <Link href="/login">
            {/* Button container box removed; clean gradient button only */}
            <button className="get-started-btn" style={styles.button}>
              Get Started
            </button>
          </Link>
        </div>

        <footer style={styles.footer}>
          © 2026 Francisco_Maica Merylle_3D - Laboratory Exercise No. 4 (Infot6)
        </footer>
      </div>
    </>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative' as 'relative',
    background: 'linear-gradient(180deg, #ec4899 0%, #fbc2eb 70%, #ff5cba 100%)',
    fontFamily: "'Inter', sans-serif",
  },
  glassContainer: {
    position: 'relative' as 'relative',
    zIndex: 100,
    background: 'rgba(231, 209, 224, 0.55)', 
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    padding: '60px 45px',
    borderRadius: '45px',
    border: '1px solid rgba(254, 63, 124, 0.4)',
    /* Stronger shadow to stand out against the mountains */
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 255, 255, 0.1)',
    maxWidth: '850px',
    textAlign: 'center' as 'center',
    margin: '0 20px',
  },
  mountainScene: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  title: {
    fontSize: '64px',
    fontWeight: '950',
    marginBottom: '25px',
    textTransform: 'uppercase' as 'uppercase',
    letterSpacing: '-1.5px',
    lineHeight: '1',
    display: 'block',
  },
  description: {
    fontSize: '18px',
    color: '#40039c', 
    lineHeight: '1.6',
    marginBottom: '40px',
    fontWeight: '500' as '500',
    maxWidth: '680px',
    margin: '0 auto 40px auto',
  },
  button: {
    padding: '16px 55px',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none', // Removed any extra container border
    borderRadius: '50px',
    cursor: 'pointer',
    textTransform: 'uppercase' as 'uppercase',
    letterSpacing: '1px',
    outline: 'none',
  },
  footer: {
    position: 'absolute' as 'absolute',
    bottom: '20px',
    fontSize: '12px',
    color: '#ffffff',
    zIndex: 2,
    opacity: 0.9,
  }
};

const interactiveStyles = `
  /* Fast Neon Blink - High brightness and quicker interval */
  @keyframes brightBlink {
    0%, 100% { 
        filter: drop-shadow(0 0 8px rgba(249, 235, 246, 1));
        opacity: 1; 
    }
    50% { 
        filter: drop-shadow(0 0 25px rgba(236, 72, 153, 0.8)) brightness(1.3);
        opacity: 0.9; 
    }
  }

  .neon-blink-fast {
    background: linear-gradient(90deg, #c60566, #cd0cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: brightBlink 0.8s infinite ease-in-out; /* Accelerated to 0.8s for a faster vibe */
  }

  .get-started-btn {
    background: linear-gradient(135deg, #ec4899 0%, #d946ef 100%);
    color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
  }

  .get-started-btn:hover {
    transform: translateY(-4px);
    background: linear-gradient(135deg, #ff007f 0%, #ff5cba 100%) !important;
    box-shadow: 0 12px 25px rgba(255, 0, 127, 0.5);
  }

  /* Landscape Components */
  .sun {
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    width: 260px; height: 260px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 120px rgba(255, 255, 255, 0.6);
  }

  .mountains-back {
    position: absolute; bottom: 0; width: 100%; height: 26vh;
    background: #f472b6;
    clip-path: polygon(0 100%, 15% 45%, 35% 85%, 50% 25%, 75% 75%, 85% 35%, 100% 100%);
    opacity: 0.6;
  }

  .mountains-front {
    position: absolute; bottom: 0; width: 100%; height: 16vh;
    background: #db2777;
    clip-path: polygon(0 100%, 20% 55%, 45% 90%, 65% 45%, 85% 80%, 100% 50%, 100% 100%);
  }
  
  
`;