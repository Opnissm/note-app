const express = require("express");
const NoteController = require("../controllers/NoteController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/notes", auth, NoteController.getNotes);

router.put("/notes", auth, NoteController.updateNote);

router.post("/notes", auth, NoteController.createNote);

router.delete("/notes", auth, NoteController.deleteNote);

module.exports = router;
