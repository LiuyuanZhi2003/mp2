import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="nav">
      <div className="container">
        <div className="brand">The Art Institute of Chicago Digital Collections Browser</div>
        <div className="links">
          <Link className={location.pathname === '/' ? 'active' : ''} to="/">List</Link>
          <Link className={location.pathname.startsWith('/gallery') ? 'active' : ''} to="/gallery">Gallery</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;