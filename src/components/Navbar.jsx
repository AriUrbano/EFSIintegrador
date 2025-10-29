import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-item" end>
          <span className="nav-text">Home</span>
        </NavLink>
        <NavLink to="/nuevo" className="nav-item">
          <span className="nav-text">Nuevo</span>
        </NavLink>
        <NavLink to="/resumen" className="nav-item">
          <span className="nav-text">Resumen</span>
        </NavLink>
        <NavLink to="/ajustes" className="nav-item">
          <span className="nav-text">Ajustes</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;