# 🌱 ShambaSmart (SmartSeason)

**Agricultural Field Monitoring System**

ShambaSmart is a simple yet powerful platform designed to help agricultural teams track crop progress and field health. It connects coordinators in the office with agents on the ground to ensure every field gets the attention it needs.

**🚀 Live Demo**: [https://shamba-smart-nu.vercel.app/](https://shamba-smart-nu.vercel.app/)

---

## 📖 Table of Contents
- [Quick Start Guide](#-quick-start-guide)
- [Core Features](#-core-features)
- [How It Works (Business Logic)](#-how-it-works-business-logic)
- [Technical Stack](#-technical-stack)
- [Design Decisions](#-design-decisions)
- [Future Roadmap](#-future-roadmap)
- [Demo Credentials](#-demo-credentials)

---

## ⚡ Quick Start Guide

Follow these steps to get ShambaSmart running on your local machine.

### 1. Database Setup (PostgreSQL)
Ensure you have PostgreSQL installed and running.
1. Create a database named `smartShamba`.
2. Open your terminal and run the following command to initialize the schema:
   ```bash
   psql -U your_username -d smartShamba -f backend/sql/schema.sql
   ```

### 2. Backend Setup
1. Navigate to the `backend` folder: `cd backend`.
2. Install dependencies: `npm install`.
3. Copy the example environment file: `cp .env.example .env` (or create one manually).
4. Update the `.env` file with your PostgreSQL credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=smartShamba
   JWT_SECRET=supersecret_key
   ```
5. Start the server: `npm run dev`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the application: `npm run dev`.
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Core Features

### 👨‍💼 Admin (Coordinator) Portal
- **Global Dashboard**: See the total number of fields, status breakdowns, and recent activity across the whole operation.
- **Field Management**: Create new fields, specify crop types, and set planting dates.
- **Agent Assignments**: Assign specific agents to fields. Admins can see who is responsible for which plot at a glance.
- **Roster Management**: Register new field agents and manage their accounts.

### 🚜 Field Agent Portal
- **Personalized View**: Agents only see the fields assigned to them, keeping their workspace clean and focused.
- **Real-time Updates**: Log observations and move fields through growth stages (`PLANTED` → `GROWING` → `READY` → `HARVESTED`).
- **Observation History**: See a timeline of past notes for each field to track progress over time.

---

## 🧠 How It Works (Business Logic)

The "Status" of a field is automatically calculated by the system to help coordinators prioritize their day.

### The "At Risk" Logic
A field is flagged as **At Risk** if:
- It is currently in the `PLANTED` or `GROWING` stage.
- **AND** the current date is within **7 days** of (or has passed) its `expected_harvest_date`.

This logic assumes that if a crop hasn't reached the "Ready" stage by its target date, there may be an issue with growth, irrigation, or pests that requires immediate attention.

### Harvest Forecasting
The `expected_harvest_date` is automatically calculated by adding the `growth_duration_days` to the `planting_date`. This calculation happens at the database level to ensure data integrity across all services.

---

## 🛠️ Technical Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL (Relational).
- **Security**: JWT for authentication, Bcrypt for password hashing.
- **Icons**: Lucide React.

---

## 📐 Design Decisions

- **Relational Integrity**: Used PostgreSQL to manage the relationship between users (Agents) and fields. This ensures that when an agent is deleted or updated, the system maintains a clean state.
- **Mobile-Responsive Design**: The UI is built with a "Mobile-First" approach using Tailwind CSS, as field agents are likely to use the app on smartphones while in the field.
- **Stateless Auth**: Used JWT stored in `localStorage` to keep the application fast and scalable, avoiding the need for server-side sessions.
- **Clean API**: Followed RESTful principles for endpoints, making the backend easy to test and extend.

---

## 🗺️ Future Roadmap

If I had more time, I would implement:
1. **Offline Sync**: Allow agents to log updates in remote areas without internet, syncing once they return to a 4G/Wi-Fi zone.
2. **Photo Uploads**: Let agents attach photos of crops to their notes for better visual tracking.
3. **Weather Integration**: Pull local weather data to correlate crop health with rainfall or temperature patterns.
4. **Push Notifications**: Alert agents when a new field is assigned to them or alert admins when a field status changes to "At Risk."

---

## 🧪 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@shamba.io` | `admin123` |
| **Agent** | `agent@shamba.io` | `agent123` |

*Note: New agents can be registered by the Admin via the Agent Roster page.*

---
*Developed by Urbanus for the Full Stack Developer Assessment.*
