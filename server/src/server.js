import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050; // Distinct Backend Server Port 5050

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "AI Resume Creation REST API Backend",
    port: PORT,
    timestamp: new Date().toISOString(),
    authSupported: ["PHONE_PASSWORD", "PHONE_OTP", "EMAIL_OTP"],
    databaseReady: true
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resumes", resumeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 REST Backend Server running on http://localhost:${PORT}`);
});
