# 🛡️ Security Operations Center Dashboard

A full-stack, real-time Security Operations Center (SOC) dashboard built with the MERN stack. This project simulates real-time log monitoring, alerting, and analysis from a sample JSONL log file. Designed for cybersecurity visualization and SOC training/demo purposes.

---

## 🚀 Demo Link

- **Frontend (React)**: https://soc-frontend-lemon.vercel.app/
- **Backend (Node/Express)**: https://security-dashboard-backend-2wa3rz1v7.vercel.app/

---

## 🛠 Tech Stack

### 🖥️ Frontend

- React (Create React App)
- Chart.js (for visualizations)
- Axios
- Tailwind CSS (for styling)
- React Router

### 🖥 Backend

- Node.js
- Express.js
- CORS
- JSONL file parsing

---

## 📂 Folder Structure

/soc-backend # React frontend
/soc-frontend # Express backend

---

## ⚙️ Setup Instructions (Local)

### Prerequisites

- Node.js & npm installed
- Git

---

### 🔧 Backend Setup

```bash
cd soc-backend
npm install
npm start
```

Server will run on http://localhost:5000

### 🔧 Frontend Setup

```bash
cd soc-frontend
npm install
npm start
```

Frontend will run on http://localhost:3000

### 🔗 API Endpoints

| Method | Endpoint              | Description                           |
| ------ | --------------------- | ------------------------------------- |
| GET    | `/api/event-count`    | Returns count of each event type      |
| GET    | `/api/events-by-hour` | Returns hourly distribution of events |
| GET    | `/api/logs`           | Returns all logs parsed from `.jsonl` |

### 🚀 Features

📊 Real-time log visualization with Chart.js
⚠️ Event count & severity breakdowns
🕓 Hourly distribution of logs
✅ Fully deployed on Vercel (frontend & backend)
