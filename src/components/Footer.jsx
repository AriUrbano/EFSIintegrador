import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Prosupuesto Boca Juniors</h3>
          <p>Gestiona tus finanzas personales de manera simple y efectiva.</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/nuevo">Nuevo Movimiento</a></li>
            <li><a href="/resumen">Resumen</a></li>
            <li><a href="/ajustes">Ajustes</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📧 info@mipresupuesto.com</p>
          <p>📱 +54 11 1234-5678</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Presupuesto Boca Juniors. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;