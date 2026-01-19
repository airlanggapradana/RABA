"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildToken = exports.linkParentChild = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const SALT_ROUNDS = 10;
const register = async (req, res) => {
    const { email, password, fullName, role } = req.body;
    if (!email || !password || !fullName)
        return res.status(400).json({ message: "Missing fields" });
    const existing = await prisma_1.default.profile.findUnique({ where: { email } });
    if (existing)
        return res.status(409).json({ message: "Email already registered" });
    const hashed = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    const user = await prisma_1.default.profile.create({
        data: { email, password: hashed, fullName, role }
    });
    return res.status(201).json({ id: user.id, email: user.email, role: user.role });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Missing fields" });
    const user = await prisma_1.default.profile.findUnique({ where: { email } });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt_1.default.compare(password, user.password);
    if (!ok)
        return res.status(401).json({ message: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, role: user.role, userId: user.id });
};
exports.login = login;
const linkParentChild = async (req, res) => {
    const parentId = req.auth.userId;
    const { childEmail } = req.body;
    if (!childEmail)
        return res.status(400).json({ message: "Missing childEmail" });
    const child = await prisma_1.default.profile.findUnique({ where: { email: childEmail } });
    if (!child)
        return res.status(404).json({ message: "Child not found" });
    if (child.role !== "CHILD")
        return res.status(400).json({ message: "User must be CHILD role" });
    const existing = await prisma_1.default.parentChild.findUnique({
        where: { parentId_childId: { parentId, childId: child.id } }
    });
    if (existing)
        return res.status(400).json({ message: "Already linked" });
    const link = await prisma_1.default.parentChild.create({
        data: { parentId, childId: child.id }
    });
    res.json(link);
};
exports.linkParentChild = linkParentChild;
const getChildToken = async (req, res) => {
    const userId = req.auth.userId;
    try {
        const user = await prisma_1.default.profile.findUnique({
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
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get token" });
    }
};
exports.getChildToken = getChildToken;
function generateDeviceToken(userId) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `ESP32-${userId.substring(0, 8)}-${timestamp}-${random}`;
}
//# sourceMappingURL=auth.controller.js.map