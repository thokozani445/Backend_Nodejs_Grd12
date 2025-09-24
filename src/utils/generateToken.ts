// generateToken.ts
import jwt from "jsonwebtoken";

export function generateToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET || "supersecret", {
    expiresIn: "1h",
  });
}