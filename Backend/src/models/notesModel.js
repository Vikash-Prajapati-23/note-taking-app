import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    discription: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const notesModel = mongoose.model("note", noteSchema);
