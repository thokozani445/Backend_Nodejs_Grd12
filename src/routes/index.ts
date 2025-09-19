import { Router } from "express";
import adminLogin from "./adminLogin";

const router = Router();


router.get("/health", (_req, res) => res.json({ status: "ok", uptime: process.uptime() }));
router.use("/admin", adminLogin);
export default router;


