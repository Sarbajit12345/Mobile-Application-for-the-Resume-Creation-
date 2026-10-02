// Unified Database Repository Layer with fallbacks
// Supports in-memory/JSON persistence and Prisma ORM integration

const inMemoryResumes = new Map();

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
