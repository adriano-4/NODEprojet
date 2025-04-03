const Etudiant = require("../models/etudiantModel.js");

exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.getAll();
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEtudiantById = async (req, res) => {
  try {
    const { queryParam } = req.query; 

    if (!queryParam) {
      return res.status(400).json({
        message:
          "Le paramètre de recherche (num_et, nom_et ou prenom_et) est requis",
      });
    }

    const result = await Etudiant.recherche(queryParam);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Aucun étudiant trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.createEtudiant = async (req, res) => {
  try {
    const { num_et, nom_et, prenom_et, email_et } = req.body;

    // Vérification des champs requis
    if (!num_et || !nom_et || !prenom_et || !email_et) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Appel à la méthode pour ajouter l'étudiant dans la base de données
    const result = await Etudiant.create(num_et, nom_et, prenom_et, email_et);

    res
      .status(201)
      .json({ message: "Étudiant ajouté avec succès", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const { num_et, nom_et, prenom_et, email_et } = req.body;
    const { id_et } = req.params;

    if (!num_et || !nom_et || !prenom_et || !email_et || !id_et) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const result = await Etudiant.update(
      id_et,
      num_et,
      nom_et,
      prenom_et,
      email_et
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Étudiant modifié avec succès" });
    } else {
      res.status(404).json({ message: "Étudiant non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const id_et = req.params.id_et;
    const etudiant = await Etudiant.delete(id_et);

    if (etudiant.length === 0) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    res.json(etudiant[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
