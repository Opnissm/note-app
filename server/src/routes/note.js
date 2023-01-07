const express = require("express");
const NoteController = require("../controllers/NoteController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/notes", auth, NoteController.getNotes);

module.exports = router;
