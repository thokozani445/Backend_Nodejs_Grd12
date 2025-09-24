import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { comparePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

/**
 * Teacher Login
 */export async function loginTeacher(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { teacher: true },
    });

    if (!user || user.role !== Role.TEACHER) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check account state
    if (!user.teacher?.verified || user.teacher?.subscription !== "active") {
      return res.status(403).json({
        error: "Account not active. Please complete verification & have an active subscription.",
      });
    }

    const token = generateToken({ id: user.id, role: user.role });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
}