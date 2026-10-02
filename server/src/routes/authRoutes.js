import express from "express";
import { AuthConfigRepository, UserRepository, VerificationRepository, SecurityLogRepository } from "../database/repository.js";

const router = express.Router();

// Get active DB Auth Configuration
router.get("/config", async (req, res) => {
  try {
    const config = await AuthConfigRepository.getConfig();
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin update DB Auth Configuration
router.put("/config", async (req, res) => {
  try {
    const updated = await AuthConfigRepository.updateConfig(req.body);
    res.json({ success: true, message: "Database Auth Configuration updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Step 1: Register User with Basic Details
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Full Name, Email, and Phone Number are required." });
    }

    const existing = await UserRepository.findByEmailOrPhone(email) || await UserRepository.findByEmailOrPhone(phone);
    if (existing) {
      return res.status(400).json({ success: false, message: "A user with this Email or Phone Number already exists." });
    }

    const newUser = await UserRepository.create({ fullName, email, phone, password });
    const config = await AuthConfigRepository.getConfig();
    const defaultOtp = config.defaultOtpCode || "123456";

    await VerificationRepository.createToken({ target: email, code: defaultOtp, type: "EMAIL_VERIFY" });
    await VerificationRepository.createToken({ target: phone, code: defaultOtp, type: "PHONE_OTP" });
    await SecurityLogRepository.log(newUser.id, "USER_REGISTERED");

    res.status(201).json({
      success: true,
      message: `Registration successful. Default verification OTP code is set to ${defaultOtp}.`,
      userId: newUser.id,
      mockCodesForDemo: {
        emailCode: defaultOtp,
        phoneCode: defaultOtp
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Step 2: Verify Registration Email / Phone Code
router.post("/verify-code", async (req, res) => {
  try {
    const { target, code, type } = req.body;
    const isValid = await VerificationRepository.verifyCode({ target, code, type });

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
    }

    const user = await UserRepository.findByEmailOrPhone(target);
    if (user) {
      if (type === "EMAIL_VERIFY") await UserRepository.update(user.id, { isEmailVerified: true });
      if (type === "PHONE_OTP") await UserRepository.update(user.id, { isPhoneVerified: true });
      await SecurityLogRepository.log(user.id, `VERIFIED_${type}`);
    }

    res.json({ success: true, message: "Verification successful! Account activated.", user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login via Phone/Email + Password
router.post("/login-password", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await UserRepository.findByEmailOrPhone(identifier);

    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ success: false, message: "Invalid Phone Number/Email or Password." });
    }

    await UserRepository.update(user.id, { lastLoginAt: new Date().toISOString() });
    await SecurityLogRepository.log(user.id, "LOGIN_PASSWORD");

    const { passwordHash, ...cleanUser } = user;
    res.json({ success: true, message: "Login successful", user: cleanUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send OTP to Phone or Email
router.post("/send-otp", async (req, res) => {
  try {
    const { identifier } = req.body;
    const user = await UserRepository.findByEmailOrPhone(identifier);

    if (!user) {
      return res.status(404).json({ success: false, message: "No account found matching this Phone or Email." });
    }

    const config = await AuthConfigRepository.getConfig();
    const otpCode = config.defaultOtpCode || "123456";
    await VerificationRepository.createToken({ target: identifier, code: otpCode, type: "PHONE_OTP" });

    res.json({
      success: true,
      message: `6-digit OTP code dispatched to ${identifier}`,
      mockOtpCode: otpCode
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login via OTP
router.post("/login-otp", async (req, res) => {
  try {
    const { identifier, otpCode } = req.body;
    const isValid = await VerificationRepository.verifyCode({ target: identifier, code: otpCode, type: "PHONE_OTP" });

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP code." });
    }

    const user = await UserRepository.findByEmailOrPhone(identifier);
    if (!user) {
      return res.status(404).json({ success: false, message: "User account not found." });
    }

    await UserRepository.update(user.id, { lastLoginAt: new Date().toISOString(), isPhoneVerified: true });
    await SecurityLogRepository.log(user.id, "LOGIN_OTP");

    const { passwordHash, ...cleanUser } = user;
    res.json({ success: true, message: "OTP authentication successful!", user: cleanUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
