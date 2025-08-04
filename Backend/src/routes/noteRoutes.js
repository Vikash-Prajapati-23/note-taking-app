import express from "express";
import {
  createNotes,
  deleteNotes,
  fetchNotes,
  editNotes,
} from "../controllers/noteController.js";
import { authMiddelware } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/create-notes", authMiddelware, createNotes);
router.get("/fetch-notes", authMiddelware, fetchNotes);
router.delete("/delete-notes/:id", authMiddelware, deleteNotes);
router.patch("/edit-notes/:id", authMiddelware, editNotes);  // We use patch when we need to partially update.

export default router;
