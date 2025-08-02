import { notesModel } from "../models/notesModel.js";

export async function createNotes(req, res) {
  const { title, discription } = req.body;

  try {
    // Create new notes.
    const newNotes = await notesModel.create({ title, discription });

    return res.status(201).json({
      // Wehn we creating something we use status code 201.
      message: "Note created successfully.!",
      newNotes: {
        _id: newNotes._id,
        title: newNotes.title,
        discription: newNotes.discription,
      },
    });
  } catch (error) {
    console.error("Error while creating note.", error);
    return res.status(500).json({ error, message: "Internal server error.!" });
  }
}
