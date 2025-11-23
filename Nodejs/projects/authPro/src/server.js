import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { pool } from "./utils/database.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// quick DB connectivity check
(async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log("MySQL pool connected");
  } catch (err) {
    console.error("MySQL connection failed", err);
    process.exit(1);
  }
})();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
