'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import Link from 'next/link';
import styles from '../components/AuthPage.module.css';

export default function LoginPage() {
  const [user, setUser] = useState<any>(null);
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); 
  const [activeManual, setActiveManual] = useState<string | null>(null);

  useEffect(() => {
    if (activeManual) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeManual]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && !isRedirecting) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    };
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isRedirecting) setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, [isRedirecting]);

  const handleSignUp = async () => {
    setError('');
    if (!fullName || !email || !password) { setError('Please fill in all fields.'); return; }
    setIsRedirecting(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } },
    });
    if (signUpError) {
      setError(signUpError.message);
      setIsRedirecting(false);
    } else {
      setFullName(''); setEmail(''); setPassword('');
      setShowSuccessModal(true);
      setTimeout(async () => {
        await supabase.auth.signOut(); 
        setShowSuccessModal(false);
        setActiveForm('login');
        setIsRedirecting(false); 
      }, 2500);
    }
  };

  const handleSignIn = async () => {
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    else { setEmail(''); setPassword(''); } 
  };

 // --- Long Manual Content to Force Scrolling ---
  const manualSteps: Record<string, { title: string, steps: string[] }> = {
    supabase: {
      title: "Lab 4: Supabase Master Setup",
      steps: [
        "1. Log in to the Supabase Dashboard.",
        "2. Create a new project titled 'Supra-Sync'.",
        "3. Wait for the Database to finish scaling (approx. 2 mins).",
        "4. Go to the SQL Editor and create a 'profiles' table.",
        "5. Define columns: id (primary key), name (text), bio (text).",
        "6. Enable RLS (Row Level Security) on the profiles table.",
        "7. Create a Policy: 'Users can only view their own data'.",
        "8. Go to Settings > API to find your keys.",
        "9. Copy the Project URL and the Anon API Key.",
        "10. Create a .env.local file in your root folder.",
        "11. Paste the URL as NEXT_PUBLIC_SUPABASE_URL.",
        "12. Paste the Key as NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        "13. Restart your dev server using 'npm run dev'.",
        "14. Verify connection by checking the console logs."
      ]
    },
    auth: {
      title: "Lab 4: Auth Detailed Guide",
      steps: [
        "1. Enable Email/Password in Auth > Providers.",
        "2. Disable 'Confirm Email' for faster testing.",
        "3. Configure your Redirect URLs in Auth Settings.",
        "4. In VS Code, verify lib/supabaseClient.ts is correct.",
        "5. Check that your handleSignUp function maps correctly.",
        "6. Test registration with a fake email like test@test.com.",
        "7. Verify the user appears in the Supabase Auth list.",
        "8. Check that 'full_name' is saved in raw_user_meta_data.",
        "9. Test the login function with the registered account.",
        "10. Debug any sessions using 'supabase.auth.getSession()'."
      ]
    },
    trouble: {
      title: "Lab 4: Common Bug Fixes",
      steps: [
        "Issue: CORS Error - Add localhost:3000 to site URL.",
        "Issue: Blank Screen - Check if .env variables are loaded.",
        "Issue: RLS Block - Check if your SQL policies allow 'Insert'.",
        "Tip: Use the Network tab to find 403 or 401 errors.",
        "Tip: Clear local storage to reset the auth session manually.",
        "Tip: Always use 'try/catch' blocks in your async functions."
      ]
    }
  };

  return (
    <div className={styles.container}>
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div style={{fontSize: '50px', marginBottom: '10px'}}>✅</div>
            <h2 style={{color: '#065f46', fontWeight: 'bold'}}>Registered Successfully!</h2>
            <p style={{color: '#6a6a6a', fontSize: '14px'}}>Redirecting to login...</p>
          </div>
        </div>
      )}

      {activeManual && (
        <div className={styles.modalOverlay} onClick={() => setActiveManual(null)}>
          <div className={styles.scrollableModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveManual(null)}>×</button>
            <h2 style={{ color: '#ff1493', textAlign: 'center', marginBottom: '20px' }}>{manualSteps[activeManual].title}</h2>
            <div className={styles.stepsList}>
              {manualSteps[activeManual].steps.map((step, index) => (
                <div key={index} className={styles.stepItem}>{step}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(!user || isRedirecting) ? (
        <div className={styles.glassCard}>
          <div style={{width: '75px', height: '75px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px', color: '#515151', position: 'absolute', top: '-37.5px', left: 'calc(50% - 37.5px)', border: '2px solid rgba(255, 255, 255, 0.5)'}}>👤</div>
          
          {activeForm === 'login' ? (
            <>
              <div style={{marginBottom: '30px'}}>
                <h2 style={{color: '#6a6a6a', fontSize: '24px', letterSpacing: '3px', fontWeight: 'bold', margin: '0'}}>LOG IN</h2>
              </div>
              
              <div style={{position: 'relative', marginBottom: '18px'}}>
                <span style={{position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)'}}>✉️</span>
                <input type="email" placeholder="gmail" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} autoComplete="off" />
              </div>

              <div style={{position: 'relative', marginBottom: '18px'}}>
                <span style={{position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)'}}>🔒</span>
                <input type={showPassword ? "text" : "password"} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} autoComplete="new-password" />
                <span onClick={() => setShowPassword(!showPassword)} style={{position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '18px'}}>{showPassword ? '👁️' : '🙈'}</span>
              </div>

              <button onClick={handleSignIn} className={styles.mainButton}>LOGIN</button>
              <p style={{fontSize: '12px', color: '#6a6a6a'}}>don't have account? <span onClick={() => setActiveForm('register')} className={styles.toggleLink}>SignUp</span></p>
            </>
          ) : (
            <>
              <h2 style={{color: '#6a6a6a', fontSize: '24px', letterSpacing: '3px', fontWeight: 'bold', margin: '0'}}>CREATE ACCOUNT</h2>
              <div style={{position: 'relative', marginBottom: '18px', marginTop: '25px'}}>
                <span style={{position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)'}}>👤</span>
                <input type="text" placeholder="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={styles.inputField} autoComplete="off" />
              </div>
              <div style={{position: 'relative', marginBottom: '18px'}}>
                <span style={{position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)'}}>✉️</span>
                <input type="email" placeholder="gmail" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} autoComplete="off" />
              </div>
              <div style={{position: 'relative', marginBottom: '18px'}}>
                <span style={{position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)'}}>🔒</span>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} autoComplete="new-password" />
              </div>
              <button onClick={handleSignUp} className={styles.mainButton}>REGISTER</button>
              <p style={{fontSize: '12px', color: '#6a6a6a'}}>already have an account? <span onClick={() => setActiveForm('login')} className={styles.toggleLink}>LogIn</span></p>
            </>
          )}
          <div style={{marginTop: '25px'}}><Link href="/" className={styles.homeLink}>← Back to Home</Link></div>
          {error && <p style={{color: '#be123c', fontSize: '11px', marginTop: '10px'}}>{error}</p>}
        </div>
      ) : (
        /* DASHBOARD VIEW WITH TRANSPARENT CONTAINER */
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ position: 'absolute', top: '30px', right: '40px', display: 'flex', gap: '25px', zIndex: 10 }}>
            <Link href="/" className={styles.navLink}>HOME PAGE</Link>
            <span className={styles.navLink} onClick={() => supabase.auth.signOut()}>LOG OUT</span>
          </div>

          <div className={styles.dashboardContainer}>
            <h1 className={styles.welcomeTitle}>
              Hello and Welcome, {user.user_metadata?.full_name || 'User'}!
            </h1>
            <p className={styles.welcomeSub}>You are successfully synchronized.</p>
            <div className={styles.manualGrid}>
              <div className={styles.manualCard} onClick={() => setActiveManual('supabase')}>
                <h3>📖 Lab 4: Supabase Setup</h3>
                <p>Step-by-step database initialization.</p>
              </div>
              <div className={styles.manualCard} onClick={() => setActiveManual('auth')}>
                <h3>⚙️ Lab 4: Auth Guide</h3>
                <p>Authentication and Provider setup.</p>
              </div>
              <div className={styles.manualCard} onClick={() => setActiveManual('trouble')}>
                <h3>❓ Lab 4: Troubleshooting</h3>
                <p>Solutions for common Lab 4 bugs.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}