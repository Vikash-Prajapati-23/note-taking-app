import express from "express";
import {
  createNotes,
  deleteNotes,
  fetchNotes,
} from "../controllers/noteController.js";
import { authMiddelware } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.post("/create-notes", authMiddelware, createNotes);
router.get("/create-notes", authMiddelware, fetchNotes);
router.get("/create-notes", authMiddelware, deleteNotes);

export default router;
