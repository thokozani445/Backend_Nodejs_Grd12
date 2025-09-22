import { Router } from "express";
import authRoutes from "./authRoutes";
import teacherRoutes from "./teacherRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/teacher", teacherRoutes); 

router.get("/health", (_req, res) => res.json({ status: "ok", uptime: process.uptime() }));
router.use("/admin", adminLogin);
export default router;


