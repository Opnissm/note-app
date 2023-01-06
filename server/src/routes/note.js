const express = require("express");
const NoteController = require("../controllers/NoteController");

const router = express.Router();

router.get("/notes", NoteController.getNotes);

// router.post('/not')
module.exports = router;
