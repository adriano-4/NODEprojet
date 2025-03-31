const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const db = require('./config/dbconnexion');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importer les routes
const etudiantRoutes = require("./routes/etudiantRoutes.js");
app.use("/api/etudiants", etudiantRoutes);

const moyenneRoutes = require("./routes/moyenneRoutes.js");
app.use("/api/moyennes", moyenneRoutes);

const matiereRoutes = require("./routes/matiereRoutes.js");
app.use("/api/matieres", matiereRoutes);

const noteRoutes = require("./routes/noteRoutes.js");
app.use("/api/notes", noteRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  //console.log(Serveur backend démarré sur http://localhost:${PORT});
});
