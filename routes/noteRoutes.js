const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notecontroller");

router.get("/", noteController.getAllNotes);
router.get("/recherche", noteController.getNotesByEtudiantInfo);
router.post("/", noteController.createNotes);
router.put("/:id_note", noteController.updateNote);
router.delete("/:id_note", noteController.deleteNote);

module.exports = router;
