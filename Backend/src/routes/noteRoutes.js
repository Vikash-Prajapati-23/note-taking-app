import express from "express";
import { createNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/create-notes", createNotes);

export default router;