"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const fieldRoutes_1 = __importDefault(require("./routes/fieldRoutes"));
const updateRoutes_1 = __importDefault(require("./routes/updateRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const pool_1 = __importDefault(require("./db/pool"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//check api status
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});
//check database connecction
app.get("/api/checkdb", async (req, res) => {
    const results = await pool_1.default.query("SELECT current_database()");
    console.log(`The ${results} database is connected`);
    return res.json({
        message: `The ${results.rows[0]} database is connected`,
    });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/fields", fieldRoutes_1.default);
app.use("/api/fields", updateRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});
const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
