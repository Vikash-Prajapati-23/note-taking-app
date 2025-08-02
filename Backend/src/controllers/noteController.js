import { notesModel } from "../models/notesModel.js";

export async function createNotes(req, res) {
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    // Create new notes.
    const newNotes = await notesModel.create({ userId, title, description });

    return res.status(201).json({
      // Wehn we creating something we use status code 201.
      message: "Note created successfully.!",
      newNotes: {
        userId: newNotes.userId,
        title: newNotes.title,
        description: newNotes.description,
      },
    });
  } catch (error) {
    console.error("Error while creating note.", error);
    return res.status(500).json({ error, message: "Internal server error.!" });
  }
}

export async function fetchNotes(req, res) {
    const userId = req.user.userId;

    try {
        const userNotes = await notesModel.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ userNotes });
    } catch (error) {
        console.error(error, "error while fetching notes.");
        return res.status(500).json({ message: "failed to fetch notes.", error });
    };
};

export async function deleteNotes(req, res) {}
