import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Strictly enforce the admin email
      if (result.user.email !== 'topogabolekwe@gmail.com') {
        await auth.signOut();
        throw new Error("Unauthorized email address. Admin access only.");
      }
      
      // If successful, navigate to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/assets/brand/logo_no_bg.png" alt="TopZero Group" className="login-logo" />
        <h1>Admin Portal</h1>
        <p>Sign in to manage TopZero Group content.</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <button onClick={handleGoogleLogin} className="btn-google" disabled={loading}>
          {loading ? 'Authenticating...' : 'Sign in with Google'}
        </button>
        
        <p className="login-footer">Only authorized administrators may access this portal.</p>
      </div>
    </div>
  );
}

