import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {pool} from "../utils/database.js";

const router = express.Router();

router.get("/me", authenticate, async (req, res) => {
  res.json({ id: req.user.id, roles: req.user.roles, email: req.user.raw.email, name: req.user.raw.name });
});

router.get("/all", authenticate, authorizeRoles("admin"), async (req, res) => {
  const [rows] = await pool.execute("SELECT id, name, email, roles, created_at FROM users");
  const users = rows.map(r => ({ id: r.id, name: r.name, email: r.email, roles: JSON.parse(r.roles) }));
  res.json(users);
});

export default router;
