// Unified Database Repository Layer with fallbacks
// Supports Auth Configuration, Registration, Email/Phone Verification, Security Audit Logs, and Resumes

const inMemoryResumes = new Map();

// In-Memory Database Auth Configuration state
let currentAuthConfig = {
  id: "default_config",
  defaultOtpCode: "123456", // Default OTP code configurable at DB level
  requireEmailVerification: true,
  requirePhoneOtp: false,
  allowPasswordAuth: true,
  allowOtpAuth: true,
  otpExpirySeconds: 300,
  maxOtpAttempts: 3,
  sessionDurationHours: 24,
  updatedAt: new Date().toISOString()
};

// In-Memory User Store
const inMemoryUsers = new Map([
  [
    "user_demo",
    {
      id: "user_demo",
      fullName: "Sarbajit Roy",
      email: "sarbajit@example.com",
      phone: "+15552345678",
      passwordHash: "password123",
      isEmailVerified: true,
      isPhoneVerified: true,
      role: "ADMIN",
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  ]
]);

// Verification Tokens Store
const inMemoryTokens = new Map();

// Security Audit Logs Store
const inMemorySecurityLogs = [
  {
    id: "log_1",
    userId: "user_demo",
    action: "SYSTEM_INITIALIZED",
    ipAddress: "127.0.0.1",
    createdAt: new Date().toISOString()
  }
];

export const AuthConfigRepository = {
  async getConfig() {
    return { ...currentAuthConfig };
  },

  async updateConfig(newConfig) {
    currentAuthConfig = {
      ...currentAuthConfig,
      ...newConfig,
      updatedAt: new Date().toISOString()
    };
    return { ...currentAuthConfig };
  }
};

export const UserRepository = {
  async findByEmailOrPhone(identifier) {
    for (const user of inMemoryUsers.values()) {
      if (user.email.toLowerCase() === identifier.toLowerCase() || user.phone === identifier) {
        return { ...user };
      }
    }
    return null;
  },

  async findById(id) {
    return inMemoryUsers.get(id) || null;
  },

  async create(userData) {
    const id = `user_${Date.now()}`;
    const newUser = {
      id,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      passwordHash: userData.password || "password123",
      isEmailVerified: userData.isEmailVerified || false,
      isPhoneVerified: userData.isPhoneVerified || false,
      role: userData.role || "USER",
      lastLoginAt: null,
      createdAt: new Date().toISOString()
    };
    inMemoryUsers.set(id, newUser);
    return newUser;
  },

  async update(id, updates) {
    const existing = inMemoryUsers.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    inMemoryUsers.set(id, updated);
    return updated;
  },

  async getAll() {
    return Array.from(inMemoryUsers.values()).map(u => {
      const { passwordHash, ...clean } = u;
      return clean;
    });
  }
};

export const VerificationRepository = {
  async createToken({ target, code, type, expirySeconds = 300 }) {
    const id = `token_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const expiresAt = new Date(Date.now() + expirySeconds * 1000).toISOString();
    const tokenRecord = { id, target, code, type, expiresAt, used: false };
    inMemoryTokens.set(id, tokenRecord);
    return tokenRecord;
  },

  async verifyCode({ target, code, type }) {
    // Check against configured default OTP code or generated token
    const config = await AuthConfigRepository.getConfig();
    if (code === config.defaultOtpCode) {
      return true;
    }

    for (const [id, record] of inMemoryTokens.entries()) {
      if (
        record.target === target &&
        record.code === code &&
        record.type === type &&
        !record.used &&
        new Date(record.expiresAt) > new Date()
      ) {
        record.used = true;
        inMemoryTokens.set(id, record);
        return true;
      }
    }
    return false;
  }
};

export const SecurityLogRepository = {
  async log(userId, action, ipAddress = "127.0.0.1") {
    const entry = {
      id: `log_${Date.now()}`,
      userId,
      action,
      ipAddress,
      createdAt: new Date().toISOString()
    };
    inMemorySecurityLogs.unshift(entry);
    return entry;
  },

  async getLogsForUser(userId) {
    return inMemorySecurityLogs.filter(l => l.userId === userId || userId === "ADMIN");
  }
};

export const ResumeRepository = {
  async getAll() {
    return Array.from(inMemoryResumes.values());
  },

  async getById(id) {
    return inMemoryResumes.get(id) || null;
  },

  async create(data) {
    const id = data.id || `resume_${Date.now()}`;
    const newResume = {
      id,
      title: data.title || "My Resume",
      templateId: data.templateId || "modern-minimal",
      personalDetails: data.personalDetails || {},
      experiences: data.experiences || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
      certifications: data.certifications || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    inMemoryResumes.set(id, newResume);
    return newResume;
  },

  async update(id, data) {
    const existing = inMemoryResumes.get(id);
    if (!existing) {
      return this.create({ id, ...data });
    }
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };
    inMemoryResumes.set(id, updated);
    return updated;
  },

  async delete(id) {
    return inMemoryResumes.delete(id);
  }
};
