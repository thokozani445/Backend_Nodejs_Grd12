import { Router } from "express";
import { authenticateToken, authorizeRoles, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// Example: Only logged-in Teachers can access
router.get("/students", authenticateToken, authorizeRoles("TEACHER"), async (req: AuthRequest, res) => {
  // Example placeholder logic
  res.json({ msg: `Here are your students, Teacher ID ${req.user?.id}` });
});

router.post("/lessons", authenticateToken, authorizeRoles("TEACHER"), async (req: AuthRequest, res) => {
  const { title, content } = req.body;
  
  // Example simulate db save (replace with prisma.lesson.create())
  res.json({
    msg: "Lesson created successfully",
    teacherId: req.user?.id,
    lesson: { title, content }
  });
});

export default router;