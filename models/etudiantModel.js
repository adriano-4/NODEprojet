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

  static async recherche(num_et, nom_et, prenom_et) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM etudiant WHERE 1=1";
      let params = [];

      if (num_et) {
        query += " AND num_et LIKE ?";
        params.push(`%${num_et}%`);
      }

      if (nom_et) {
        query += " AND nom_et LIKE ?";
        params.push(`%${nom_et}%`);
      }

      if (prenom_et) {
        query += " AND prenom_et LIKE ?";
        params.push(`%${prenom_et}%`);
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
