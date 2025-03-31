import { useState } from "react";
import "../css/navBar.css";
import "font-awesome/css/font-awesome.min.css";
import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo1} className="logo1" alt="logo1" />
      </div>
      <div className={`navbar__links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Acceuil</Link>
          </li>
          <li>
            <Link to="/etudiants">Gestion</Link>
          </li>
          <li>
            <Link to="/evaluations">Resultats</Link>
          </li>
          <li>
            <Link to="/statistiques">Statistiques</Link>
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
