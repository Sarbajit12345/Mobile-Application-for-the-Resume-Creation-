# 🚀 AI-Powered Resume Creation Application (Web, Mobile & REST Backend)

A full-stack cross-platform AI resume builder system with dual auth (Phone+Password & Phone/Email OTP with default code `123456`), user management suite, database-level auth configuration, and dedicated Web and Mobile (Android/iOS) UI applications.

---

## 🌐 Isolated Application Services & Network Ports

Each component runs on a dedicated, isolated port and URL to prevent any conflicts:

| Application Component | Isolated Port | Service URL | Description |
|---|---|---|---|
| ⚡ **Backend REST API Server** | `5050` | [`http://localhost:5050`](http://localhost:5050) | Node.js/Express REST API, AI endpoints, Prisma DB layer, Auth & User Management |
| 💻 **Web Application** | `3000` | [`http://localhost:3000`](http://localhost:3000) | Modern React + Vite Web App, Live A4 Resume Editor, Admin Config Dashboard |
| 📱 **Mobile Application** | `8080` | [`http://localhost:8080`](http://localhost:8080) | Touch-first Android/iOS Mobile App, Swipeable Wizard, Touch Auth Drawers |

---

## 📁 Repository Structure

```
├── architecture.json      # System Architecture Specification in JSON format (v1.2.0)
├── web/                   # Web Application (Port 3000)
├── mobile/                # Mobile / Android Application (Port 8080)
├── server/                # REST API Backend Server (Port 5050)
└── README.md              # Project Documentation & Setup Guide
```

---

## ⚙️ Getting Started

### 1. Backend REST API Server (`/server` - Port 5050)
```bash
cd server
npm install
npm start
```
*REST API Server running on `http://localhost:5050`*

### 2. Web Application (`/web` - Port 3000)
```bash
cd web
npm install
npm run dev
```
*Web App running on `http://localhost:3000`*

### 3. Mobile Application (`/mobile` - Port 8080)
```bash
cd mobile
npm install
npm run dev
```
*Mobile App running on `http://localhost:8080`*

---

## 🔑 Configurable Default OTP (`123456`)

- All Email & Phone OTP verification codes default to **`123456`**.
- Configurable directly from the database schema `AuthConfig` (`defaultOtpCode: "123456"`).
- Admin UI Configuration Page on **`http://localhost:3000`** and **`http://localhost:8080`** allows live updating of the default OTP PIN.

---

## 🔗 Remote Repository
Git link: [https://github.com/Sarbajit12345/Mobile-Application-for-the-Resume-Creation-.git](https://github.com/Sarbajit12345/Mobile-Application-for-the-Resume-Creation-.git)
