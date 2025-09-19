// src/middleware/requireAdmin.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken, AdminJwtPayload } from "../jwt";

export interface AuthedRequest extends Request {
  user?: AdminJwtPayload;
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || "";
  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return res.status(401).json({ error: "Missing token" });
  try {
    req.user = verifyToken(token);
    if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
