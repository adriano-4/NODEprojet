const Note = require("../models/noteModel");

// Récupérer toutes les notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.getAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotesByEtudiantInfo = async (req, res) => {
  try {
    const { num_et, nom_et, prenom_et } = req.query;

    // Vérification de la présence de critères
    if (!num_et && !nom_et && !prenom_et) {
      return res.status(400).json({
        message:
          "Au moins un des champs 'num_et', 'nom_et' ou 'prenom_et' est requis",
      });
    }

    const notes = await Note.getByEtudiantInfo(num_et, nom_et, prenom_et);

    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res
        .status(404)
        .json({ message: "Aucune note trouvée pour cet étudiant" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotes = async (req, res) => {
  try {
    const { note, num_et, num_mat } = req.body;

    if (!note || !num_et || !num_mat) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const result = await Note.createNote(note, num_et, num_mat);
    res.status(201).json({ message: "Note ajoutée avec succès", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { note } = req.body;
    const { id_note } = req.params;

    if (!note || !id_note) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const result = await Note.update(id_note, note);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Note modifiée avec succès" });
    } else {
      res.status(404).json({ message: "Note non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const id_note = req.params.id_note;
    const note = await Note.delete(id_note);

    if (note.length === 0) {
      return res.status(404).json({ message: "Note non trouvée" });
    }

    res.json(note[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
