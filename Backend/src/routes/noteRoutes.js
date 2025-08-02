import express from "express";
import {
  createNotes,
  deleteNotes,
  fetchNotes,
} from "../controllers/noteController.js";
import { authMiddelware } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/create-notes", authMiddelware, createNotes);
router.get("/fetch-notes", authMiddelware, fetchNotes);
router.get("/delete-notes", authMiddelware, deleteNotes);

export default router;
