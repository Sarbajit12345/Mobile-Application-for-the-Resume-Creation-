import express from "express";
import { UserRepository, SecurityLogRepository } from "../database/repository.js";

const router = express.Router();

// Get all users (Admin view)
router.get("/", async (req, res) => {
  try {
    const users = await UserRepository.getAll();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Profile
router.put("/profile", async (req, res) => {
  try {
    const { userId, fullName, email, phone } = req.body;
    const updated = await UserRepository.update(userId, { fullName, email, phone });
    await SecurityLogRepository.log(userId, "PROFILE_UPDATED");
    res.json({ success: true, message: "Profile updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Security: Change Password
router.post("/change-password", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    await UserRepository.update(userId, { passwordHash: newPassword });
    await SecurityLogRepository.log(userId, "PASSWORD_CHANGED");
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Security Logs
router.get("/security-logs/:userId", async (req, res) => {
  try {
    const logs = await SecurityLogRepository.getLogsForUser(req.params.userId);
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
