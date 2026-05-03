import Note from "../models/Note.js";


// ✅ CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const note = await Note.create({
      title,
      content,
      user: userId,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET ALL NOTES
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "username email");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET NOTE BY ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("user");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
