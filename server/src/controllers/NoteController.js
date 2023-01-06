const Note = require("../models/note");

exports.getNotes = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const notes = await Note.find({ creator: userId });

    return res.json({ notes });
  } catch (err) {
    console.log(err);
  }
};
