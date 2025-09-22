// use the namespace import – works with or without esModuleInterop
import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "dev-secret";
// 👇 cast to the exact type that jsonwebtoken expects
const EXPIRES = (process.env.JWT_EXPIRES ?? "7d") as jwt.SignOptions["expiresIn"];

export type AdminJwtPayload = { sub: number; role: "admin"; email: string };

export function signAdminToken(user: { id: number; email: string }): string {
  const payload: AdminJwtPayload = { sub: user.id, role: "admin", email: user.email };
  return jwt.sign(payload as object, SECRET as jwt.Secret, { expiresIn: EXPIRES });
}

export function verifyToken(token: string): AdminJwtPayload {
  const decoded = jwt.verify(token, SECRET as jwt.Secret) as jwt.JwtPayload | string;
  if (typeof decoded === "string") throw new Error("Invalid token payload");
  const sub = Number(decoded.sub);
  const role = decoded.role as unknown as string;
  const email = decoded.email as unknown as string;
  if (!email || role !== "admin" || Number.isNaN(sub)) throw new Error("Invalid token payload");
  return { sub, role: "admin", email };
}
