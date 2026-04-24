import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import fieldRoutes from "./routes/fieldRoutes";
import updateRoutes from "./routes/updateRoutes";
import userRoutes from "./routes/userRoutes";
import pool from "./db/pool";
import { errorHandler } from "./middleware/errorMiddleware";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
//check api status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
//check database connecction
app.get("/api/checkdb", async (req, res) => {
  const results = await pool.query("SELECT current_database()");
  console.log(`The ${results} database is connected`);
  return res.json({
    message: `The ${results.rows[0]} database is connected`,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/fields", updateRoutes);
app.use("/api/users", userRoutes);

// Global Error Handler
app.use(errorHandler);

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
