import { Router, Request, Response } from "express";
import crypto from "crypto";

const noteRouter = Router();

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

interface NoteInput {
  title: string;
  content: string;
  tags: string;
}

const notes: Note[] = [
  {
    id: crypto.randomUUID(),
    title: "Note-1",
    content: "This is the first note",
    tags: ["test", "java", "backend"],
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: "Note-2",
    content: "This is the second note",
    tags: ["test", "javascript", "nodejs"],
    createdAt: new Date().toISOString()
  }
];

// GET / - all notes or filtered
noteRouter.get("/", (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (typeof q === "string" && q.trim().length > 0) {
      const filteredNotes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(q.toLowerCase()) ||
          note.content.toLowerCase().includes(q.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()))
      );
      return res.status(200).json({ success: true, data: filteredNotes });
    }

    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error in GET /notes", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching notes"
    });
  }
});

// GET /:id - get note by id
noteRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = notes.find((item) => item.id === id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note does not exist",
        id
      });
    }

    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error("Error /notes/:id : ", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching the note"
    });
  }
});

// POST / - create new note
noteRouter.post("/", (req: Request<{}, {}, NoteInput>, res: Response) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }

    const note: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
      createdAt: new Date().toISOString()
    };

    notes.push(note);
    return res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error("Error while POST /notes:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to insert note"
    });
  }
});

export default noteRouter;
