import React, { useState } from 'react';
import { authService } from '../api/services';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        const data = await authService.login(email, password);
        localStorage.setItem('token', data.access_token);
        navigate('/');
      } else {
        await authService.register(email, password);
        // auto-login after register
        const data = await authService.login(email, password);
        localStorage.setItem('token', data.access_token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto', marginTop: '10vh' }}>
      <h2 className="text-center mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </h2>
      
      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      
      <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
        <span className="text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </span>
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}
        >
          {isLogin ? 'Sign up here' : 'Log in here'}
        </button>
      </div>
    </div>
  );
}
