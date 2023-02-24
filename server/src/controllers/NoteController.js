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
  let titleErr = null;
  try {
    const { title, content } = req.body;

    let updateObject = {};

    if (title) {
      updateObject["title"] = title;
    } else if (content) {
      updateObject["content"] = content;
    }

    await Note.findOneAndUpdate(
      { _id: req.body.noteId, creator: req.user._id },
      updateObject
    );

    const updatedNotes = await Note.find({
      creator: req.user._id,
    });

    return res.json({ notes: updatedNotes, isSuccess: true });
  } catch (err) {
    return res.json({
      errorMsg: "Server error",
      titleErr,
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
