import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName, role } = req.body;
  if (!email || !password || !fullName) return res.status(400).json({ message: "Missing fields" });
  const existing = await prisma.profile.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.profile.create({
    data: { email, password: hashed, fullName, role }
  });

  return res.status(201).json({ id: user.id, email: user.email, role: user.role });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  const user = await prisma.profile.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, role: user.role, userId: user.id });
};

export const linkParentChild = async (req: AuthRequest, res: Response) => {
  const parentId = req.auth!.userId;
  const { childEmail } = req.body;

  if (!childEmail) return res.status(400).json({ message: "Missing childEmail" });

  const child = await prisma.profile.findUnique({ where: { email: childEmail } });
  if (!child) return res.status(404).json({ message: "Child not found" });
  if (child.role !== "CHILD") return res.status(400).json({ message: "User must be CHILD role" });

  const existing = await prisma.parentChild.findUnique({
    where: { parentId_childId: { parentId, childId: child.id } }
  });

  if (existing) return res.status(400).json({ message: "Already linked" });

  const link = await prisma.parentChild.create({
    data: { parentId, childId: child.id }
  });

  res.json(link);
};

export const getChildToken = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  try {
    const user = await prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== "CHILD") {
      return res.status(403).json({ message: "Only children can get ESP32 token" });
    }

    // Generate a unique device token for ESP32
    const deviceToken = generateDeviceToken(userId);
    
    res.json({ 
      deviceToken,
      userId,
      role: user.role,
      fullName: user.fullName
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get token" });
  }
};

function generateDeviceToken(userId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `ESP32-${userId.substring(0, 8)}-${timestamp}-${random}`;
}