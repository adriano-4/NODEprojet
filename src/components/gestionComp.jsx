import "../css/gestion.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

function GestionComp({ activeContainer, handleShowSuppEt, setShowAjoutEt }) {
  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [moyennes, setMoyennes] = useState({});
  const [searchParam, setSearchParam] = useState("");
  const [messageErreur, setMessageErreur] = useState("");
  const [editingEtudiant, setEditingEtudiant] = useState(null);

  useEffect(() => {
    const fetchMoyennes = async () => {
      try {
        const newMoyennes = {};
        for (let etudiant of etudiants) {
          const response = await axios.get(
            `http://localhost:5000/api/moyennes/${etudiant.id_et}`
          );
          newMoyennes[etudiant.id_et] =
            response.data.moyenne !== null
              ? response.data.moyenne
              : "Non disponible";
        }
        setMoyennes(newMoyennes);
      } catch (error) {
        console.error("Erreur lors de la récupération des moyennes", error);
      }
    };

    if (etudiants.length > 0) {
      fetchMoyennes();
    }
  }, [etudiants]);

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/matieres")
      .then((response) => {
        setMatieres(response.data);
      })
      .catch((error) => {
        console.error(
          "Il y a eu une erreur lors de la récupération des matieres !",
          error
        );
      });
  }, [matieres]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchParam(value);
  };

  const handleSearch = debounce(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/etudiants/recherche",
        {
          params: {
            queryParam: searchParam,
          },
        }
      );

      if (response.data.length === 0) {
        setMessageErreur("Étudiants non trouvés");
        setEtudiants([]);
      } else {
        setMessageErreur("");
        setEtudiants(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche", error);
    }
  }, 200);

  useEffect(() => {
    if (searchParam) {
      handleSearch();
    }
  }, [searchParam]);

  const validermodif = () => {
    axios
      .put(
        `http://localhost:5000/api/etudiants/${editingEtudiant.id_et}`,
        editingEtudiant
      )
      .then(() => {
        setEtudiants((prevEtudiants) =>
          prevEtudiants.map((etudiant) =>
            etudiant.id_et === editingEtudiant.id_et
              ? editingEtudiant
              : etudiant
          )
        );
        setEditingEtudiant(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification", error);
      });
  };

  return (
    <div className="container">
      <div
        className="cont"
        style={{ display: activeContainer === "etudiant" ? "block" : "none" }}
      >
        <div className="cont11">
          <h2 className="titre">Listes des étudiants :</h2>
          <div className="droite">
            <input
              type="text"
              placeholder="Recherche ..."
              value={searchParam}
              onChange={handleInputChange}
            />
            <button onClick={() => setShowAjoutEt(true)}>
              <i className="fa fa-plus"></i> <span>Ajouter</span>
            </button>
          </div>
        </div>

        {/* Affichage du message d'erreur si aucun étudiant trouvé */}
        {messageErreur && <p style={{ color: "red" }}>{messageErreur}</p>}

        {/* Affichage du tableau si des étudiants sont trouvés */}
        {etudiants.length > 0 && (
          <div className="tableau">
            <table>
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Adresse Mail</th>
                  <th>Moyenne</th>
                  <th>Observation</th>
                  <th colSpan={3}>Action</th>
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant) => (
                  <tr key={etudiant.id_et}>
                    <td>
                      {editingEtudiant?.id_et === etudiant.id_et ? (
                        <input
                          id="inpmod"
                          type="text"
                          value={editingEtudiant.num_et}
                          onChange={(e) => {
                            setEditingEtudiant({
                              ...editingEtudiant,
                              num_et: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        etudiant.num_et
                      )}
                    </td>

                    <td>
                      {editingEtudiant?.id_et === etudiant.id_et ? (
                        <input
                          id="inpmod"
                          type="text"
                          value={editingEtudiant.nom_et}
                          onChange={(e) => {
                            setEditingEtudiant({
                              ...editingEtudiant,
                              nom_et: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        etudiant.nom_et.toUpperCase()
                      )}
                    </td>
                    <td>
                      {editingEtudiant?.id_et === etudiant.id_et ? (
                        <input
                          id="inpmod"
                          type="text"
                          value={editingEtudiant.prenom_et}
                          onChange={(e) => {
                            setEditingEtudiant({
                              ...editingEtudiant,
                              prenom_et: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        etudiant.prenom_et
                      )}
                    </td>

                    <td>
                      {editingEtudiant?.id_et === etudiant.id_et ? (
                        <input
                          id="inpmod"
                          type="text"
                          value={editingEtudiant.email_et}
                          onChange={(e) => {
                            setEditingEtudiant({
                              ...editingEtudiant,
                              email_et: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        etudiant.email_et
                      )}
                    </td>
                    <td>{moyennes[etudiant.id_et] || "Chargement..."}</td>
                    <td>
                      {moyennes[etudiant.id_et] === "Non disponible"
                        ? "Aucune note"
                        : moyennes[etudiant.id_et] >= 10
                        ? "Admis"
                        : "Redoublant"}
                    </td>
                    <td id="btnmod">
                      {editingEtudiant?.id_et === etudiant.id_et ? (
                        <>
                          <button
                            id="aj"
                            onClick={() => {
                              validermodif();
                            }}
                          >
                            <i class="fa fa-check"></i>
                          </button>
                          <button
                            id="ann"
                            onClick={() => setEditingEtudiant(null)}
                          >
                            <i class="fa fa-times"></i>
                          </button>
                        </>
                      ) : (
                        <button
                          className="modifier"
                          onClick={() => setEditingEtudiant(etudiant)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="supprimer"
                        onClick={() => handleShowSuppEt(etudiant.id_et)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="cont"
        style={{ display: activeContainer === "matiere" ? "block" : "none" }}
      >
        <div className="cont11">
          <h2 className="titre">Listes des matieres :</h2>
          <div className="droite"></div>
        </div>

        {/* Affichage du tableau si des étudiants sont trouvés */}
        {matieres.length > 0 && (
          <div className="tableau">
            <table>
              <thead>
                <tr>
                  <th>num_mat</th>
                  <th>design</th>
                  <th>coeff</th>
                </tr>
              </thead>
              <tbody>
                {matieres.map((matiere) => (
                  <tr>
                    <td>{matiere.num_mat}</td>
                    <td>{matiere.design}</td>
                    <td>{matiere.coeff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default GestionComp;
