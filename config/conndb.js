const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Création du pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Le nombre maximum de connexions dans le pool
  queueLimit: 0, // Pas de limite pour les requêtes en attente
});

// Obtenez une connexion depuis le pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL avec le pool de connexions");

  // Ne pas oublier de libérer la connexion quand elle n'est plus nécessaire
  connection.release();
});

module.exports = pool;
