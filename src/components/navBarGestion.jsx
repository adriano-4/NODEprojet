import "../css/navBarGestion.css";
import "font-awesome/css/font-awesome.min.css";

function NavBarGestion({ setActiveContainer }) {
  const handleClick = (containerType) => {
    setActiveContainer(containerType);
  };

  return (
    <nav className="navbargestion">
      <ul>
        <li>
          <button onClick={() => handleClick("etudiant")}>Etudiant</button>
        </li>
        <li>
          <button onClick={() => handleClick("matiere")}>Matiere</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarGestion;
