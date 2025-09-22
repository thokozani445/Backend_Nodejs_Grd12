import { Router } from "express";
import authRoutes from "./authRoutes";
import teacherRoutes from "./teacherRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/teacher", teacherRoutes); 

export default router;