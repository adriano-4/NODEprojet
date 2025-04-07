import "../css/resultat.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Info_note({ fermerinfo, etudiant }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (etudiant?.num_et) {
      axios
        .get(`http://localhost:5000/api/notes/${etudiant.num_et}`)
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error(
            "Il y a eu une erreur lors de la récupération des notes de l'étudiant !",
            error
          );
        });
    }
  }, [etudiant?.num_et]);

  const handleEditClick = (id) => {
    console.log("Modifier l'élément avec id:", id);
  };

  return (
    <div className="container3">
      <div className="cont">
        <button id="fermer" onClick={fermerinfo}>
          <i className="fa fa-times"></i>
        </button>
        <div className="cont_1">
          <p>Matricule : </p>
          <span>{etudiant?.num_et}</span>
        </div>
        <div className="cont_1">
          <p>Nom : </p>
          <span>
            {etudiant?.nom_et} {etudiant?.prenom_et}
          </span>
        </div>
        <div className="tableau2">
          <table>
            <thead>
              <tr>
                <th>Matière</th>
                <th>Note</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id_et}>
                  <td>{note.design}</td>
                  <td>{note.note}</td>
                  <td>
                    <button
                      id="modifier"
                      onClick={() => handleEditClick(note.id_et)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Info_note;
