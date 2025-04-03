const db = require("../config/conndb");

class Etudiant {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM etudiant", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async recherche(queryParam) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM etudiant WHERE 1=1"; // On commence avec une condition toujours vraie
      let params = [];

      if (queryParam) {
        query += " AND (num_et LIKE ? OR nom_et LIKE ? OR prenom_et LIKE ?)";
        const searchTerm = `%${queryParam}%`; // Ajoute les % pour faire une recherche "contient"
        params.push(searchTerm, searchTerm, searchTerm); // Cherche dans num_et, nom_et, prenom_et
      }

      db.query(query, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async create(num_et, nom_et, prenom_et, email_et) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO etudiant (num_et, nom_et, prenom_et, email_et) VALUES (?, ?, ?, ?)",
        [num_et, nom_et, prenom_et, email_et],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }

  static async update(id_et, num_et, nom_et, prenom_et, email_et) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE etudiant SET num_et = ?, nom_et = ?, prenom_et = ?, email_et = ? WHERE id_et = ?",
        [num_et, nom_et, prenom_et, email_et, id_et],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }

  static async delete(id_et) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE from etudiant WHERE id_et = ?",
        [id_et],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }
}

module.exports = Etudiant;
