import { useState } from "react";
import "../css/navBar.css";
import "font-awesome/css/font-awesome.min.css";
import logo1 from "../assets/logo1.png";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo1} className="logo1" alt="logo1" />
      </div>
      <div className={`navbar__links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li className={getLinkClass("/")}>
            <Link to="/">Acceuil</Link>
            <div id="rond"></div>
          </li>
          <li className={getLinkClass("/etudiants")}>
            <Link to="/etudiants">Gestion</Link>
            <div id="rond"></div>
          </li>
          <li className={getLinkClass("/evaluations")}>
            <Link to="/evaluations">Resultats</Link>
            <div id="rond"></div>
          </li>
          <li className={getLinkClass("/statistiques")}>
            <Link to="/statistiques">Statistiques</Link>
            <div id="rond"></div>
          </li>
        </ul>
      </div>
      <button className="deco">
        <p>Se deconnecter</p>
        <i class="fa fa-sign-out"></i>
      </button>
      <div className="navbar__toggle" onClick={toggleMenu}>
        <span>{isMenuOpen ? "Close" : "Menu"}</span>
      </div>
    </nav>
  );
}

export default NavBar;
