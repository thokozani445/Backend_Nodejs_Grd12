import { Router } from "express";

const router = Router();

// Health check route
router.get("/health", (_, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

export default router;