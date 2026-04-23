# ShambaSmart Frontend

ShambaSmart is a modern agricultural management dashboard built with React and Vite. It allows administrators to track fields and assign crop monitoring tasks to field agents.

## Demo Credentials
Use these pre-configured demo credentials to explore the app (once the database is seeded):

### Administrators
- **Email:** `admin@shambasmart.com`
- **Password:** `admin123`

### Agents
- **Email:** `agent1@shambasmart.com`
- **Password:** `agent123`

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (make sure your backend API is running):
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root of the `frontend` folder with your backend URL:
```env
VITE_API_URL=http://localhost:5000/api
```
