import "../css/gestion.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function GestionComp({ activeContainer }) {
  const [etudiants, setEtudiants] = useState([]);
  const [moyennes, setMoyennes] = useState({});

  // Utiliser useEffect pour récupérer les données au chargement du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/etudiants")
      .then((response) => {
        setEtudiants(response.data); // Stocke les données dans le state
      })
      .catch((error) => {
        console.error("Il y a eu une erreur !", error);
      });
  }, []);

  useEffect(() => {
    etudiants.forEach((etudiant) => {
      axios
        .get(`http://localhost:5000/api/moyennes/${etudiant.id_et}`)
        .then((response) => {
          setMoyennes((prevMoyennes) => ({
            ...prevMoyennes,
            [etudiant.id_et]:
              response.data.moyenne !== null
                ? response.data.moyenne
                : "Non disponible",
          }));
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de la moyenne oh!",
            error
          );
        });
    });
  }, [etudiants]);

  return (
    <div className="container">
      <div
        className="cont"
        style={{ display: activeContainer === "etudiant" ? "block" : "none" }}
      >
        <div className="cont11">
          <h2 className="titre">Listes des étudiants :</h2>
          <div className="droite">
            <input type="text" placeholder="Recherche ..." />
            <button>
              Ajouter <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="tableau">
          <table>
            <thead>
              <tr>
                <th>Matricule</th>
                <th>Nom et Prénom</th>
                <th>Adresse Mail</th>
                <th>Moyenne</th>
                <th>Observation</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etudiant) => (
                <tr key={etudiant.id_et}>
                  <td>{etudiant.num_et}</td>
                  <td>
                    {etudiant.nom_et.toUpperCase()} {etudiant.prenom_et}
                  </td>
                  <td>{etudiant.email_et}</td>
                  <td>{moyennes[etudiant.id_et] || "Chargement..."}</td>
                  <td>
                    {moyennes[etudiant.id_et] === "Non disponible"
                      ? "Aucune note"
                      : moyennes[etudiant.id_et] >= 10
                      ? "Admis"
                      : "Redoublant"}
                  </td>
                  <td>
                    <button>Modifier</button>
                  </td>
                  <td>
                    <button>supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="cont"
        style={{ display: activeContainer === "matiere" ? "block" : "none" }}
      >
        <div className="cont11">
          <h2 className="titre">Listes des Matieres :</h2>
        </div>
      </div>
    </div>
  );
}

export default GestionComp;
