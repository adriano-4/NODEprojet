const db = require("../config/conndb");

class Note {
  // Récupérer toutes les notes
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM note", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // Récupérer les notes par l'ID de l'étudiant
  static async getByEtudiantInfo(num_et, nom_et, prenom_et) {
    return new Promise((resolve, reject) => {
      let query = `
      SELECT note.note, matiere.design 
      FROM note 
      JOIN matiere ON note.num_mat = matiere.num_mat
      JOIN etudiant ON note.id_et = etudiant.id_et
      WHERE 1=1
    `;
      let params = [];

      if (num_et) {
        query += " AND etudiant.num_et LIKE ?";
        params.push(`%${num_et}%`);
      }

      if (nom_et) {
        query += " AND etudiant.nom_et LIKE ?";
        params.push(`%${nom_et}%`);
      }

      if (prenom_et) {
        query += " AND etudiant.prenom_et LIKE ?";
        params.push(`%${prenom_et}%`);
      }

      db.query(query, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // Ajouter une note
  static async createNote(note, num_et, num_mat) {
    return new Promise((resolve, reject) => {
      // Premièrement, on recherche l'id_et correspondant au num_et
      db.query(
        "SELECT id_et FROM etudiant WHERE num_et = ?",
        [num_et],
        (err, results) => {
          if (err) {
            reject(err);
          } else if (results.length > 0) {
            // Si l'étudiant est trouvé, on récupère l'id_et
            const id_et = results[0].id_et;

            // Ensuite, on insère la note dans la table note avec l'id_et
            db.query(
              "INSERT INTO note (note, id_et, num_mat) VALUES (?, ?, ?)",
              [note, id_et, num_mat],
              (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results); // La note a été ajoutée avec succès
                }
              }
            );
          } else {
            // Si l'étudiant n'est pas trouvé
            reject(new Error("Étudiant non trouvé avec num_et: " + num_et));
          }
        }
      );
    });
  }

  static async update(id_note, note) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE note SET note = ? WHERE id_note = ?",
        [note, id_note],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }

  // Supprimer une note
  static async delete(id_note) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM note WHERE id_note = ?",
        [id_note],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }
}

module.exports = Note;
