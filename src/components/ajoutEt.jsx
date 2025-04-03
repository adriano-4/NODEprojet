import { useState } from "react";
import axios from "axios";
import "../css/ajoutEt.css";

function AjoutEt({ setShowAjoutEt }) {
  const [etudiant, setEtudiant] = useState({
    num_et: "",
    nom_et: "",
    prenom_et: "",
    email_et: "",
  });

  const [message, setMessage] = useState(""); // Message de retour

  const handleAnnuler = () => {
    setEtudiant({ num_et: "", nom_et: "", prenom_et: "", email_et: "" });
    setShowAjoutEt(false);
  };

  const handleChange = (e) => {
    setEtudiant({ ...etudiant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Réinitialiser le message

    try {
      const response = await axios.post(
        "http://localhost:5000/api/etudiants",
        etudiant
      );
      setMessage(`Étudiant ajouté avec succès ! ID: ${response.data.id}`);
      setEtudiant({ num_et: "", nom_et: "", prenom_et: "", email_et: "" });
      setShowAjoutEt(false);
    } catch (error) {
      if (error.response) {
        setMessage(
          "Erreur: " +
            (error.response.data.message || "Une erreur est survenue.")
        );
      } else if (error.request) {
        setMessage("Erreur: Le serveur ne répond pas.");
      } else {
        setMessage("Erreur: " + error.message);
      }
    }
  };

  return (
    <div className="flou">
      <div className="centre">
        <h2>Ajout étudiant</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="num_et"
            placeholder="Matricule"
            value={etudiant.num_et}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="nom_et"
            placeholder="Nom"
            value={etudiant.nom_et}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="prenom_et"
            placeholder="Prénom"
            value={etudiant.prenom_et}
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            name="email_et"
            placeholder="Adresse email"
            value={etudiant.email_et}
            onChange={handleChange}
          />
          <br />
          <div className="button">
            <input
              className="annuler"
              type="button"
              value="Annuler"
              onClick={handleAnnuler}
            />
            <input className="ajouter" type="submit" value="Ajouter" />
          </div>
        </form>

        {/* Affichage du message de succès ou d'erreur */}
        {message && (
          <p className={message.startsWith("Erreur") ? "error" : "success"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AjoutEt;
