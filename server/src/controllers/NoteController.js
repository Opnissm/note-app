const Note = require("../models/note");

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ creator: req.user._id });
    return res.json({ notes });
  } catch (err) {
    return res.json({
      errorMsg: "Server error",
    });
  }
};
exports.createNote = async (req, res, next) => {
  try {
    const newNote = new Note({
      creator: req.user._id,
      content: "",
      title: "Untitled",
    });
    await newNote.save();

    const notes = await Note.find({
      creator: req.user._id,
    });

    return res.json({ notes, isSuccess: true });
  } catch (err) {
    return res.json({
      errorMsg: "Server error",
    });
  }
};
exports.updateNote = async (req, res, next) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.body.noteId, creator: req.user._id },
      {
        content: req.body.content,
      }
    );

    const updatedNotes = await Note.find({
      creator: req.user._id,
    });

    return res.json({ notes: updatedNotes, isSuccess: true });
  } catch (err) {
    console.log(err.message);
    return res.json({
      errorMsg: "Server error",
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.body.noteId);

    const notes = await Note.find({
      creator: req.user._id,
    });

    return res.json({ notes });
  } catch (err) {
    return res.json({
      errorMsg: "Server error",
    });
  }
};
