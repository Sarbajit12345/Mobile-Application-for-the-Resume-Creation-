import express from "express";
import { ResumeRepository } from "../database/repository.js";

const router = express.Router();

// Get all resumes
router.get("/", async (req, res) => {
  try {
    const resumes = await ResumeRepository.getAll();
    res.json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get resume by ID
router.get("/:id", async (req, res) => {
  try {
    const resume = await ResumeRepository.getById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new resume
router.post("/", async (req, res) => {
  try {
    const newResume = await ResumeRepository.create(req.body);
    res.status(201).json({ success: true, data: newResume });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update resume
router.put("/:id", async (req, res) => {
  try {
    const updated = await ResumeRepository.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete resume
router.delete("/:id", async (req, res) => {
  try {
    await ResumeRepository.delete(req.params.id);
    res.json({ success: true, message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
