const mongoose = require("mongoose");

//note schema
const noteSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    subject: String,
    userID: String,
  },
  {
    versionkey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
