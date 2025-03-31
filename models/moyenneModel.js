const db = require("../config/conndb");

class Moyenne {
  static async getMoyenneById(id_et) {
    return new Promise((resolve, reject) => {
      // ⿡ Récupérer le nombre total de matières
      db.query(
        `SELECT COUNT(*) AS totalMatieres FROM matiere`,
        (err, matiereResults) => {
          if (err) return reject(err);

          const totalMatieres = matiereResults[0].totalMatieres;

          // ⿢ Vérifier combien de matières ont une note
          db.query(
            `SELECT COUNT(DISTINCT note.num_mat) AS matieresAvecNotes,
                    SUM(note.note * matiere.coeff) AS total, 
                    SUM(matiere.coeff) AS total_coeff
             FROM note
             JOIN matiere ON note.num_mat = matiere.num_mat
             WHERE note.id_et = ?`,
            [id_et],
            (err, results) => {
              if (err) return reject(err);

              const matieresAvecNotes = results[0].matieresAvecNotes;
              const total = results[0].total;
              const total_coeff = results[0].total_coeff;

              // ⿣ Vérifier si l’étudiant a une note pour chaque matière
              if (matieresAvecNotes < totalMatieres) {
                return resolve(null); // "Non disponible"
              }

              // ⿤ Calculer la moyenne
              const moyenne = Math.round((total / total_coeff) * 100) / 100;
              resolve(moyenne);
            }
          );
        }
      );
    });
  }
}

module.exports = Moyenne;
