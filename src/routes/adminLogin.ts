import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db";
import { signAdminToken } from "../jwt";
import { requireAdmin, AuthedRequest } from "../middleware/requireAdmin";

const router = Router();

const normalizeEmail = (e: string) => String(e || "").trim().toLowerCase();

// POST /api/admin/login  { email, password }
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const { rows } = await pool.query(
    "SELECT id, email, name, password_hash FROM admins WHERE email=$1 LIMIT 1",
    [normalizeEmail(email)]
  );
  if (rows.length === 0) return res.status(401).json({ error: "Invalid email or password" });

  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid email or password" });

  const token = signAdminToken({ id: user.id, email: user.email });
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: "admin" }
  });
});

// GET /api/admin/me  (protected example)
router.get("/me", requireAdmin, (req: AuthedRequest, res) => {
  // payload comes from the token; fetch DB if you need fresh data
  res.json({ user: req.user });
});

export default router;
