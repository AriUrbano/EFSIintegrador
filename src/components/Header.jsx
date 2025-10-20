import React from 'react';
import Navbar from './Navbar';
import Tema from './Tema';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>💰 Mi Presupuesto</h1>
        </div>
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="header-tema">
          <Tema />
        </div>
      </div>
    </header>
  );
};

export default Header;