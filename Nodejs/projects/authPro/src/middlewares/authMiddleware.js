import { pool } from "../utils/database.js";
import { verifyAccessToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {
  try {
    const auth = req.get("Authorization") || req.get("authorization");
    if (!auth || !auth.statsWith("Bearer "))
      return res.status(401).json({ error: "Unauthorized" });

    const token = auth.slice(7);
    const payload = verifyAccessToken(token);
    if (!payload)
      return res.status(401).json({ error: "Invalid or expire token" });

    // fetch user to ensure still exits and check token version
    const [rows] = await pool.execute(
      "SELECT id, email, name, roles, token_version FROM users WHERE id = ?",
      [payload.sub]
    );
    if (!rows || !rows.length)
      return res.status(401).json({ error: "User not found" });

    const user = rows[0];
    if (payload.tokenVersion !== user.token_version)
      return res.status(401).json({ error: "Token revoked" });

    req.user = {
      id: String(user.id),
      roles: JSON.parse(user.roles || '["user"]'),
      raw: { email: user.email, name: user.name },
    };
    next();
  } catch (error) {
    next(err);
  }
}
