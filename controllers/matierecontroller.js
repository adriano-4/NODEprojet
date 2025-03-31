const Matiere = require("../models/matiereModel");
exports.getAllMatieres = async (req, res) => {
  try {
    const matieres = await Matiere.getAll();
    res.json(matieres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatiereByNum = async (req, res) => {
  try {
    const { num_mat, design } = req.query;

    if (!num_mat && !design) {
      return res.status(400).json({
        message: "Au moins un des champs 'num_mat' ou 'design' est requis",
      });
    }

    const result = await Matiere.recherche(num_mat, design);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Aucune matiere trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMatiere = async (req, res) => {
  try {
    const { num_mat, design, coeff } = req.body;

    if (!design || !coeff || !num_mat) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const result = await Matiere.create(num_mat, design, coeff);
    res
      .status(201)
      .json({ message: "Matiere ajoutée avec succès", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMatiere = async (req, res) => {
  try {
    const { design, coeff } = req.body;
    const { num_mat } = req.params;

    if (!design || !coeff || !num_mat) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const result = await Matiere.update(design, coeff, num_mat);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Matière modifiée avec succès" });
    } else {
      res.status(404).json({ message: "Matière non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMatiere = async (req, res) => {
  try {
    const num_mat = req.params.num_mat;
    const result = await Matiere.delete(num_mat);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Matière non trouvée" });
    }

    res.status(200).json({ message: "Matière supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
