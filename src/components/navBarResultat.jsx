import "../css/navBarResultat.css";
import "font-awesome/css/font-awesome.min.css";

function NavBarEtudiant({ setActiveContainer }) {
  const handleClick = (containerType) => {
    setActiveContainer(containerType);
  };

  return (
    <nav className="navbarresultat">
      <ul>
        <li>
          <button onClick={() => handleClick("Maths")}>Maths</button>
        </li>
        <li>
          <button onClick={() => handleClick("Physique")}>Physique</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarEtudiant;
