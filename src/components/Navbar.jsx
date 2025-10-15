import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item">
        Home
      </NavLink>
      <NavLink to="/Nuevo" className="nav-item">
        Nuevo
      </NavLink>
      <NavLink to="/Resumen" className="nav-item">
        Resumen
      </NavLink>
      <NavLink to="/Ajustes" className="nav-item">
        Ajustes
      </NavLink>
    </nav>
  );
}

export default Navbar;