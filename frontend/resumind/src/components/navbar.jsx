import React from 'react';

const Navbar = () => (
  <nav style={{
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor: '#007bff',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #ddd',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    boxSizing: 'border-box'
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'black' }}>ResuMind</div>
    <ul style={{
      display: 'flex',
      gap: '1.5rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: '1rem',
      fontWeight: 500
    }}>
      <li><a href="/" style={{ textDecoration: 'none', color: '#333' }}>Home</a></li>
      <li><a href="/search" style={{ textDecoration: 'none', color: '#333' }}>Job Search</a></li>
      <li><a href="/matches" style={{ textDecoration: 'none', color: '#333' }}>Matches</a></li>
    </ul>
  </nav>
);

export default Navbar;