import { useState } from "react";
import NavBar from "../components/navBar";
import NavBarGestion from "../components/navBarGestion";
import GestionComp from "../components/gestionComp";
import AjoutEt from "../components/ajoutEt";

function Etudiants() {
  const [activeContainer, setActiveContainer] = useState("etudiant");

  return (
    <div>
      <NavBar />
      <NavBarGestion setActiveContainer={setActiveContainer} />{" "}
      <GestionComp activeContainer={activeContainer} />
      {/* <AjoutEt /> */}
    </div>
  );
}

export default Etudiants;
