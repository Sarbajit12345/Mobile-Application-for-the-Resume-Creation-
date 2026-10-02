# 🚀 AI-Powered Resume Creation Application (Web, Mobile & Backend Server)

A modern, full-stack cross-platform resume builder system with AI features (Summary Generation, Bullet Point Enhancement, ATS Resume Scoring), complete Web and Mobile (Android/iOS) UI applications, and a scalable Node.js/Express REST backend server with plug-and-play database provisioning (PostgreSQL, MongoDB, SQLite).

---

## 📁 Repository Structure

```
├── architecture.json      # Complete System Architecture Specification in JSON format
├── web/                   # Modern Web Application (React + Vite + PDF Generator + Design System)
├── mobile/                # Mobile / Android Application (Touch Wizard UI + AI Action Sheet)
├── server/                # REST API Backend Server (Node.js/Express + Prisma DB Layer + AI APIs)
└── README.md              # Project Documentation & Setup Guide
```

---

## ✨ Features Matrix

- **AI Resume Intelligence**:
  - 🪄 **AI Professional Summary Generator**: Auto-generates role-tailored summaries based on your skills and experience level.
  - ⚡ **Action-Verb Bullet Point Enhancer**: Rewrites work responsibilities into impactful, quantified achievement statements.
  - 📊 **ATS Match & Scoring Engine**: Analyzes keyword density, section formatting, and calculates an ATS score (0-100%) with actionable improvement tips.
- **Web Application (`/web`)**:
  - Live side-by-side real-time interactive document preview.
  - Multiple professional resume template designs (Modern Minimal, Executive Split, Tech Innovator).
  - High-resolution PDF Export & JSON data import/export.
- **Mobile Application (`/mobile`)**:
  - Touch-first swipeable wizard editor tailored for mobile and Android screens.
  - Mobile bottom action drawers for quick AI assist.
  - Offline sync with LocalStorage and mobile PDF sharing.
- **Backend API Server (`/server`)**:
  - REST endpoints for AI processing (`/api/ai/generate-summary`, `/api/ai/enhance-bullets`, `/api/ai/ats-score`).
  - Resume storage CRUD endpoints (`/api/resumes`).
  - Modular Database Layer with Prisma schema ready for PostgreSQL, MongoDB, or SQLite.

---

## ⚙️ Getting Started

### 1. Backend API Server Setup (`/server`)
```bash
cd server
npm install
npm start
```
*Server will start on `http://localhost:5000`*

### 2. Web Application Setup (`/web`)
```bash
cd web
npm install
npm run dev
```
*Web app will start on `http://localhost:5173`*

### 3. Mobile Application Setup (`/mobile`)
```bash
cd mobile
npm install
npm run dev
```
*Mobile interface will start on `http://localhost:5174`*

---

## 🗄️ Database Provisioning

The backend includes a Prisma database layer. By default, it operates with a light in-memory/JSON fallback repository for zero-dependency local testing.

To connect to a persistent database (PostgreSQL, MongoDB, SQLite):
1. Navigate to `/server`.
2. Configure `.env` with your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/resumedb?schema=public"
   ```
3. Run Prisma migration:
   ```bash
   npx prisma db push
   ```

---

## 📜 Architecture Specification

The system architecture is saved in **JSON format** in [`architecture.json`](./architecture.json).

---

## 🔗 Remote Repository
Git link: [https://github.com/Sarbajit12345/Mobile-Application-for-the-Resume-Creation-.git](https://github.com/Sarbajit12345/Mobile-Application-for-the-Resume-Creation-.git)
