import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);       // CREATE
router.get("/", getAllNotes);       // READ ALL
router.get("/:id", getNoteById);    // READ ONE
router.put("/:id", updateNote);     // UPDATE
router.delete("/:id", deleteNote);  // DELETE

export default router;
