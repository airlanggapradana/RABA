import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  auth?: { userId: string; role: string };
}

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });
  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : parts[0];
  
  if (!token) return res.status(401).json({ message: "Missing token" });
  
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.auth = { userId: payload.userId, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.auth) return res.status(401).json({ message: "Not authenticated" });
  if (!roles.includes(req.auth.role)) return res.status(403).json({ message: "Forbidden" });
  next();
};