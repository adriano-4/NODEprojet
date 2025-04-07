import "../css/resultat.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ResultatComp() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/etudiants")
      .then((response) => {
        setEtudiants(response.data);
      })
      .catch((error) => {
        console.error(
          "Il y a eu une erreur lors de la récupération des étudiants !",
          error
        );
      });
  }, [etudiants]);

  return (
    <div className="container2">
      <div className="cont11">
        <h2 className="titre">Notes des étudiants :</h2>
        <div className="droite">
          <input type="text" placeholder="Recherche ..." />
          <button onClick={() => setShowAjoutEt(true)}>
            <i className="fa fa-plus"></i> <span>Ajouter</span>
          </button>
        </div>
      </div>
      <div className="tableau">
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>adresse mail</th>
              <th>plus</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant) => (
              <tr>
                <td>{etudiant.num_et}</td>
                <td>{etudiant.nom_et}</td>
                <td>{etudiant.prenom_et}</td>
                <td>{etudiant.email_et}</td>
                <td>
                  <button id="info" onClick={() => setShowInfo(true)}>
                    <i className="fa fa-info"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultatComp;
