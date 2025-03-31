const express = require("express");
const router = express.Router();
const matiereController = require("../controllers/matierecontroller");

router.get("/", matiereController.getAllMatieres);
router.get("/recherche", matiereController.getMatiereByNum);
router.post("/", matiereController.createMatiere);
router.put("/:num_mat", matiereController.updateMatiere);
router.delete("/:num_mat", matiereController.deleteMatiere);

module.exports = router;
