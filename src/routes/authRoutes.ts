import { Router } from "express";
import { loginTeacher } from "../controllers/authController";

const router = Router();

router.post("/login-teacher", loginTeacher);

export default router;