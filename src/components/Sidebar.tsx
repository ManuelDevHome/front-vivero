import { NavLink } from "react-router-dom";
import "../Style/Sidebar.css"
import { FaBoxes, FaCashRegister, FaChartLine } from "react-icons/fa";


export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.jpeg" alt="Logo Vivero" />
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="/inventario"
          className={({ isActive }) => `sidebar-btn ${isActive ? "active" : ""}`}
        >
          <span className="btn-text">Inventario</span>
          <span className="btn-sep" />
          <FaBoxes className="btn-icon" />
        </NavLink>

        <NavLink
          to="/caja"
          className={({ isActive }) => `sidebar-btn ${isActive ? "active" : ""}`}
        >
          <span className="btn-text">Caja</span>
          <span className="btn-sep" />
          <FaCashRegister className="btn-icon" />
        </NavLink>

        <NavLink
          to="/reportes"
          className={({ isActive }) => `sidebar-btn ${isActive ? "active" : ""}`}
        >
          <span className="btn-text">Reportes</span>
          <span className="btn-sep" />
          <FaChartLine className="btn-icon" />
        </NavLink>
      </nav>
    </aside>
  );
}