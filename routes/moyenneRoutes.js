const express = require("express");
const router = express.Router();
const moyenneController = require("../controllers/moyennecontroller");

router.get("/:id_et", moyenneController.getMoyenneById);

module.exports = router;
