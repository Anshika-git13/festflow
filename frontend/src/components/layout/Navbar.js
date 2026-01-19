import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎉</span>
          <span className="logo-text">FestFlow</span>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/events" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Events
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/create-event" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Create Event
              </Link>
              <Link to="/profile" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="navbar-link navbar-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar-link navbar-btn-primary" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;