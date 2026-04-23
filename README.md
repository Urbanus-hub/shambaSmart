# ShambaSmart (SmartSeason) Field Monitoring System

A production-ready SaaS dashboard designed to streamline agricultural coordination by tracking crop lifecycles, agent assignments, and field health in real-time.

---

## 🚀 Overview

ShambaSmart (SmartSeason) addresses the complexity of managing distributed agricultural operations. It provides a centralized platform where **Coordinators (Admins)** can visualize their entire field inventory and **Field Agents** can report ground-truth data. The system bridges the gap between the office and the field through a unified data flow and intelligent status monitoring.

## 🛠️ Tech Stack

- **Frontend**: 
  - **React 19 (TypeScript)** for a type-safe, component-based UI.
  - **Vite** for ultra-fast development and optimized production builds.
  - **Tailwind CSS** for a premium, responsive, and maintainable design system.
  - **Sonner & Lucide** for elegant notifications and iconography.
- **Backend**: 
  - **Node.js & Express** providing a high-performance RESTful API.
  - **TypeScript** across the entire stack to ensure data consistency.
  - **PostgreSQL** for robust, relational data storage.
- **Security**: 
  - **JWT (JSON Web Tokens)** for stateless, secure authentication.
  - **Bcrypt** for industry-standard password hashing.

---

## ✨ Detailed Features

### 1. Advanced Role-Based Access Control (RBAC)
The system enforces strict security boundaries based on user roles:
- **Admin (Coordinator)**:
  - **Global Visibility**: Access to a high-level dashboard showing metrics across all fields.
  - **Resource Management**: Full CRUD capabilities for fields and agent accounts.
  - **Dynamic Assignment**: Ability to assign or reassign agents to fields to optimize coverage.
- **Field Agent**:
  - **Focused Workflow**: A dedicated portal that filters out noise, showing only their assigned plots.
  - **Ground Reporting**: Simple interface to log observations and progress crops through their lifecycle.

### 2. Intelligent Field Lifecycle Management
Fields move through a strictly defined lifecycle: `PLANTED` → `GROWING` → `READY` → `HARVESTED`.

#### **The "At Risk" Business Logic**
The system doesn't just store data; it interprets it. A field's **Status** is computed dynamically:
- **Completed**: The crop has been `HARVESTED`.
- **At Risk**: Triggered if a field is still in `PLANTED` or `GROWING` stages but the current date is within **7 days** of (or has surpassed) the `expected_harvest_date`. This allows admins to intervene before the yield is lost.
- **Active**: Default state for fields progressing on schedule.

### 3. Automated Data Integrity
- **Generated Columns**: The `expected_harvest_date` is managed at the database level using PostgreSQL's `GENERATED ALWAYS` feature, ensuring that whenever a planting date or duration changes, the harvest target updates automatically without application-layer bugs.
- **Audit Trail**: Every update made by an agent creates a persistent record in the `field_updates` table, creating a historical timeline for every plot.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Node.js** (v18.0.0+)
- **PostgreSQL** (v14+)
- **npm** or **yarn**

### 2. Database Initialization
Create a database named `smartShamba` and execute the schema:
```bash
psql -U your_postgres_user -d smartShamba -f backend/sql/schema.sql
```

### 3. Backend Configuration
Navigate to `backend/`, install dependencies, and configure `.env`:
```bash
cd backend
npm install
```
Example `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=smartShamba
JWT_SECRET=your_jwt_signing_key
```
Start the API: `npm run dev`

### 4. Frontend Configuration
Navigate to `frontend/`, install dependencies, and start the UI:
```bash
cd frontend
npm install
npm run dev
```

---

## 📐 Design Decisions & Assumptions

- **Stateless Auth**: Chose JWT over Sessions to allow the backend to scale horizontally without needing a shared session store.
- **Atomic Updates**: When an agent logs an observation, the system allows them to update the field's stage simultaneously in a single workflow, reducing clicks and improving data accuracy.
- **Deterministic UI**: Used deterministic hashing for field images to give each plot a unique visual identity without the overhead of an image hosting service for this MVP.

---

## 🏗️ Future Roadmap (If I Had More Time)

While the current system is fully functional, the following improvements would elevate it to an enterprise-grade solution:

1. **Offline-First Capabilities**: Field agents often work in areas with poor connectivity. Implementing a Service Worker and IndexedDB (PWA) would allow them to log updates offline and sync when they return to range.
2. **Weather API Integration**: Integration with services like OpenWeather could automatically flag fields as "At Risk" if extreme weather events (frost, drought) are forecasted for a field's specific coordinates.
3. **Multimedia Observations**: Adding the ability for agents to upload photos of pests or crop health directly from their phone's camera.
4. **Geospatial Mapping**: Using Leaflet or Mapbox to visualize field boundaries on a real map rather than a list view, allowing coordinators to see geographical clusters of "At Risk" fields.
5. **Automated Reporting**: A feature to generate monthly PDF summaries for stakeholders, detailing yield predictions and agent performance metrics.
6. **Webhooks & Notifications**: Push notifications (via Firebase or Twilio) to alert admins immediately when a field's status changes to "At Risk."

---

## 🧪 Demo Access

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@shamba.io` | `admin123` |
| **Agent** | `agent@shamba.io` | `agent123` |

---
*Developed as a Technical Assessment for SmartSeason.*
