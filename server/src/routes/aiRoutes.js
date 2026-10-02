import express from "express";
import { AIService } from "../services/aiService.js";

const router = express.Router();

// Custom Prompt & Sentence Correction endpoint
router.post("/custom-prompt", async (req, res) => {
  try {
    const { promptText, contextData, actionType } = req.body;
    const result = await AIService.processCustomPrompt({ promptText, contextData, actionType });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate summary endpoint
router.post("/generate-summary", async (req, res) => {
  try {
    const { jobTitle, skills, experienceLevel } = req.body;
    const result = await AIService.generateSummary({ jobTitle, skills, experienceLevel });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Enhance bullet points endpoint
router.post("/enhance-bullets", async (req, res) => {
  try {
    const { rawText, role } = req.body;
    const result = await AIService.enhanceBullets({ rawText, role });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ATS score endpoint
router.post("/ats-score", async (req, res) => {
  try {
    const { resumeData, targetRole } = req.body;
    const result = await AIService.calculateATSScore({ resumeData, targetRole });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
