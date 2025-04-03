const express = require("express");
const router = express.Router();
const moyenneController = require("../controllers/moyennecontroller");

router.get("/:id_et", moyenneController.getMoyenneById);
router.get("/", moyenneController.getStatistiquesClasse);

module.exports = router;
