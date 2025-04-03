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

  static async getStatistiquesClasse() {
    return new Promise((resolve, reject) => {
      // ⿡ Récupérer le nombre total de matières
      db.query(
        `SELECT COUNT(*) AS totalMatieres FROM matiere`,
        (err, matiereResults) => {
          if (err) return reject(err);

          const totalMatieres = matiereResults[0].totalMatieres;

          // ⿢ Récupérer le nombre total d'étudiants
          db.query(
            `SELECT COUNT(*) AS totalEtudiants FROM etudiant`,
            (err, etudiantResults) => {
              if (err) return reject(err);

              const totalEtudiants = etudiantResults[0].totalEtudiants;

              // ⿣ Sélectionner les étudiants ayant une note pour toutes les matières
              db.query(
                `SELECT note.id_et, 
                  SUM(note.note * matiere.coeff) AS total, 
                  SUM(matiere.coeff) AS total_coeff
           FROM note
           JOIN matiere ON note.num_mat = matiere.num_mat
           GROUP BY note.id_et
           HAVING COUNT(DISTINCT note.num_mat) = ?`,
                [totalMatieres],
                (err, results) => {
                  if (err) return reject(err);

                  if (results.length === 0) {
                    return resolve({
                      totalEtudiants,
                      moyenneClasse: null,
                      minMoyenne: null,
                      maxMoyenne: null,
                      nbAdmis: 0,
                      nbRedoublants: 0,
                    });
                  }

                  // ⿤ Calculer les moyennes et compter les admis/redoublants
                  const moyennes = results.map(
                    (row) =>
                      Math.round((row.total / row.total_coeff) * 100) / 100
                  );
                  const moyenneClasse =
                    Math.round(
                      (moyennes.reduce((sum, m) => sum + m, 0) /
                        moyennes.length) *
                        100
                    ) / 100;
                  const minMoyenne = Math.min(...moyennes);
                  const maxMoyenne = Math.max(...moyennes);
                  const nbAdmis = moyennes.filter((m) => m >= 10).length;
                  const nbRedoublants = moyennes.filter((m) => m < 10).length;

                  resolve({
                    totalEtudiants,
                    moyenneClasse,
                    minMoyenne,
                    maxMoyenne,
                    nbAdmis,
                    nbRedoublants,
                  });
                }
              );
            }
          );
        }
      );
    });
  }
}

module.exports = Moyenne;
