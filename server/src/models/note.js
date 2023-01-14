const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    content: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
