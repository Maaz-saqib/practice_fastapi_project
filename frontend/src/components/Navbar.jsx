import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, PenSquare, Home } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Home size={24} />
          FastFeed
        </Link>
        <div className="navbar-nav">
          {token ? (
            <>
              <Link to="/create" className="btn btn-primary">
                <PenSquare size={18} />
                New Post
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
