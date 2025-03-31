const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/etudiantcontroller.js");

router.get("/", etudiantController.getAllEtudiants);
router.get("/recherche", etudiantController.getEtudiantById);
router.post("/", etudiantController.createEtudiant);
router.put("/:id_et", etudiantController.updateEtudiant);
router.delete("/:id_et", etudiantController.deleteEtudiant);

module.exports = router;
