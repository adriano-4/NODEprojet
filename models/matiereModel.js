const db = require('../config/conndb');

class Matiere {
    static async getAll() {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM matiere', (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      }
    
   
    static async recherche(num_mat, design) {
        return new Promise((resolve, reject) => {
          let query = "SELECT * FROM matiere WHERE 1=1";
          let params = [];
    
          if (num_mat) {
            query += " AND num_mat LIKE ?";
            params.push(`%${num_mat}%`);
          }
    
          if (design) {
            query += " AND design LIKE ?";
            params.push(`%${design}%`);
          }
    
          db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      }
    
      static async create(num_mat, design, coeff) {
        return new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO matiere (num_mat, design, coeff) VALUES (?, ?, ?)',
            [num_mat, design, coeff],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });
      }

      static async update( design, coeff,num_mat) {
        return new Promise((resolve, reject) => {
          db.query(
            "UPDATE matiere SET design = ?, coeff = ? WHERE num_mat = ?",
            [design, coeff, num_mat],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });
      }  
    
      static async delete(num_mat) {
        return new Promise((resolve, reject) => {
          db.query(
            "DELETE FROM matiere WHERE num_mat = ?",
            [num_mat],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });
      }
}
module.exports = Matiere;