import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import NavBarGestion from "../components/navBarGestion";
import GestionComp from "../components/gestionComp";
import AjoutEt from "../components/ajoutEt";
import SuppEt from "../components/suppEt";
import axios from "axios";

function Etudiants() {
  const [activeContainer, setActiveContainer] = useState("etudiant");
  const [etudiants, setEtudiants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAjoutEt, setShowAjoutEt] = useState(false);
  const [etudiantASupprimer, setEtudiantASupprimer] = useState(null);

  const handleShowSuppEt = (etudiantId) => {
    setEtudiantASupprimer(etudiantId);
    setShowModal(true);
  };

  const handleHideSuppEt = () => {
    setShowModal(false);
  };

  const handleConfirmerSuppression = () => {
    axios
      .delete(`http://localhost:5000/api/etudiants/${etudiantASupprimer}`)
      .then((response) => {
        console.log("Étudiant supprimé avec succès");
        setEtudiants(
          etudiants.filter((etudiant) => etudiant.id_et !== etudiantASupprimer)
        );
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'étudiant", error);
        setShowModal(false);
      });
  };

  return (
    <div>
      <NavBar />
      <NavBarGestion setActiveContainer={setActiveContainer} />
      <GestionComp
        activeContainer={activeContainer}
        handleShowSuppEt={handleShowSuppEt}
        setShowAjoutEt={setShowAjoutEt}
      />
      {showAjoutEt && <AjoutEt setShowAjoutEt={setShowAjoutEt} />}
      {showModal && (
        <SuppEt
          confirmerSuppression={handleConfirmerSuppression}
          annulerSuppression={handleHideSuppEt}
        />
      )}
    </div>
  );
}

export default Etudiants;
