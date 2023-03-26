const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/note.model");
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  console.log(decoded, token);
  try {
    if (decoded) {
      const notes = await NoteModel.find({ userID: decoded.userID });
      res.status(200).send(notes);
    }
  } catch (err) {
    res.status(400).send({ msg: "login error", error: err.message });
  }
});

noteRouter.post("/add", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "A new Note has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  try {
    const id = req.params.noteID;
    await NoteModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: "note is updated" });
  } catch (error) {
    res.status(400).send({ msg: "could not update the note" });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  try {
    const noteID = req.params.noteID;
    await NoteModel.findByIdAndRemove({ _id: noteID });
    res.status(200).send({ msg: "note is deleted" });
  } catch (error) {
    res.status(400).send({ msg: "could not delete the note" });
  }
});

module.exports = {
  noteRouter,
};
