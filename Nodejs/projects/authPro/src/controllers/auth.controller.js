import {AuthService} from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
    const user = await AuthService.registerUser({ name, email, password });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const ip = req.ip;
    const ua = req.get("user-agent");
    const { accessToken, refreshToken, user } = await AuthService.authenticate({ email, password, ip, userAgent: ua });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: Number(process.env.REFRESH_TOKEN_EXP_DAYS || 30) * 24 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: "/auth/refresh"
    });

    res.json({ accessToken, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function refresh(req, res) {
  try {
    const plain = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!plain) return res.status(401).json({ error: "No refresh token" });

    const ip = req.ip;
    const ua = req.get("user-agent");
    const { accessToken, refreshToken } = await AuthService.rotateRefreshToken(plain, ip, ua);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: Number(process.env.REFRESH_TOKEN_EXP_DAYS || 30) * 24 * 60 * 60 * 1000,
      path: "/auth/refresh"
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function logout(req, res) {
  try {
    const plain = req.cookies?.refreshToken || req.body?.refreshToken;
    if (plain) await AuthService.revokeRefreshToken(plain);

    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
