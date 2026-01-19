"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParents = exports.deleteParentLink = exports.linkParentToStudent = exports.getParentLinks = exports.getTeacherAssignments = exports.getAllStudents = exports.markAudioDownloaded = exports.markAudioOpened = exports.removeAudioAssignment = exports.assignAudioToStudent = exports.getAudioFiles = exports.parentChildrenProgress = exports.teacherChildrenProgress = exports.myProgress = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
// Student: get hanya audio yang di-assign oleh teacher
const myProgress = async (req, res) => {
    const userId = req.auth.userId;
    // Get audios assigned to this student by any teacher
    const assignedAudios = await prisma_1.default.teacherAudioAssignment.findMany({
        where: { studentId: userId },
        include: { audio: true },
        orderBy: { createdAt: "desc" }
    });
    const progress = await prisma_1.default.userProgress.findMany({
        where: { userId }
    });
    const progressMap = new Map(progress.map(p => [p.audioId, p]));
    const data = assignedAudios.map(a => ({
        id: a.audio.id,
        title: a.audio.title,
        audioUrl: a.audio.audioUrl,
        openedAt: progressMap.get(a.audio.id)?.openedAt ?? null,
        downloadedAt: progressMap.get(a.audio.id)?.downloadedAt ?? null
    }));
    res.json(data);
};
exports.myProgress = myProgress;
// Teacher: lihat hanya student yang punya assignment dari teacher ini
const teacherChildrenProgress = async (req, res) => {
    const teacherId = req.auth.userId;
    // Get unique students assigned by this teacher
    const studentIds = await prisma_1.default.teacherAudioAssignment.findMany({
        where: { teacherId },
        distinct: ["studentId"],
        select: { studentId: true }
    });
    const uniqueStudentIds = [...new Set(studentIds.map(s => s.studentId))];
    const students = await prisma_1.default.profile.findMany({
        where: { id: { in: uniqueStudentIds }, role: "CHILD" }
    });
    // Get audios assigned by this teacher
    const assignedAudios = await prisma_1.default.teacherAudioAssignment.findMany({
        where: { teacherId },
        distinct: ["audioId"],
        select: { audioId: true }
    });
    const uniqueAudioIds = [...new Set(assignedAudios.map(a => a.audioId))];
    const totalAudio = uniqueAudioIds.length;
    const result = await Promise.all(students.map(async (s) => {
        const played = await prisma_1.default.userProgress.count({
            where: {
                userId: s.id,
                audioId: { in: uniqueAudioIds },
                openedAt: { not: null }
            }
        });
        const downloaded = await prisma_1.default.userProgress.count({
            where: {
                userId: s.id,
                audioId: { in: uniqueAudioIds },
                downloadedAt: { not: null }
            }
        });
        const progressPercent = totalAudio > 0 ? Math.round((played / totalAudio) * 100) : 0;
        return { childId: s.id, fullName: s.fullName, played, downloaded, progressPercent };
    }));
    res.json({ totalAudio, children: result });
};
exports.teacherChildrenProgress = teacherChildrenProgress;
// Parent: lihat hanya student mereka sendiri
const parentChildrenProgress = async (req, res) => {
    const parentId = req.auth.userId;
    const links = await prisma_1.default.parentChild.findMany({
        where: { parentId },
        include: { child: true }
    });
    // Get all audios assigned to any of their children
    const childIds = links.map(l => l.childId);
    const assignedAudios = await prisma_1.default.teacherAudioAssignment.findMany({
        where: { studentId: { in: childIds } },
        distinct: ["audioId"],
        select: { audioId: true }
    });
    const uniqueAudioIds = [...new Set(assignedAudios.map(a => a.audioId))];
    const totalAudio = uniqueAudioIds.length;
    const result = await Promise.all(links.map(async (l) => {
        const played = await prisma_1.default.userProgress.count({
            where: {
                userId: l.childId,
                audioId: { in: uniqueAudioIds },
                openedAt: { not: null }
            }
        });
        const downloaded = await prisma_1.default.userProgress.count({
            where: {
                userId: l.childId,
                audioId: { in: uniqueAudioIds },
                downloadedAt: { not: null }
            }
        });
        const progressPercent = totalAudio > 0 ? Math.round((played / totalAudio) * 100) : 0;
        return { childId: l.childId, fullName: l.child.fullName, played, downloaded, progressPercent };
    }));
    res.json({ totalAudio, children: result });
};
exports.parentChildrenProgress = parentChildrenProgress;
const getAudioFiles = async (req, res) => {
    const audios = await prisma_1.default.audioFile.findMany({
        orderBy: { createdAt: "desc" }
    });
    res.json(audios);
};
exports.getAudioFiles = getAudioFiles;
// Teacher assign audio ke student
const assignAudioToStudent = async (req, res) => {
    const teacherId = req.auth.userId;
    const { audioId, studentId } = req.body;
    if (!audioId || !studentId) {
        return res.status(400).json({ message: "Missing audioId or studentId" });
    }
    const existing = await prisma_1.default.teacherAudioAssignment.findUnique({
        where: { teacherId_audioId_studentId: { teacherId, audioId, studentId } }
    });
    if (existing) {
        return res.status(400).json({ message: "Already assigned" });
    }
    const assignment = await prisma_1.default.teacherAudioAssignment.create({
        data: { teacherId, audioId, studentId }
    });
    res.json(assignment);
};
exports.assignAudioToStudent = assignAudioToStudent;
// Remove assignment
const removeAudioAssignment = async (req, res) => {
    const teacherId = req.auth.userId;
    const { audioId, studentId } = req.body;
    if (!audioId || !studentId) {
        return res.status(400).json({ message: "Missing audioId or studentId" });
    }
    const result = await prisma_1.default.teacherAudioAssignment.delete({
        where: { teacherId_audioId_studentId: { teacherId, audioId, studentId } }
    });
    res.json(result);
};
exports.removeAudioAssignment = removeAudioAssignment;
const markAudioOpened = async (req, res) => {
    const userId = req.auth.userId;
    const { audioId } = req.body;
    if (!audioId)
        return res.status(400).json({ message: "Missing audioId" });
    const existing = await prisma_1.default.userProgress.findUnique({
        where: { userId_audioId: { userId, audioId } }
    });
    if (existing && existing.openedAt) {
        return res.json({ message: "Already marked" });
    }
    const progress = await prisma_1.default.userProgress.upsert({
        where: { userId_audioId: { userId, audioId } },
        update: { openedAt: new Date() },
        create: { userId, audioId, openedAt: new Date() }
    });
    res.json(progress);
};
exports.markAudioOpened = markAudioOpened;
const markAudioDownloaded = async (req, res) => {
    const userId = req.auth.userId;
    const { audioId } = req.body;
    if (!audioId)
        return res.status(400).json({ message: "Missing audioId" });
    const progress = await prisma_1.default.userProgress.upsert({
        where: { userId_audioId: { userId, audioId } },
        update: { downloadedAt: new Date() },
        create: { userId, audioId, downloadedAt: new Date() }
    });
    res.json(progress);
};
exports.markAudioDownloaded = markAudioDownloaded;
const getAllStudents = async (req, res) => {
    const students = await prisma_1.default.profile.findMany({ where: { role: "CHILD" } });
    res.json(students);
};
exports.getAllStudents = getAllStudents;
const getTeacherAssignments = async (req, res) => {
    const teacherId = req.auth.userId;
    const assignments = await prisma_1.default.teacherAudioAssignment.findMany({
        where: { teacherId },
        include: { audio: true, student: true },
        orderBy: { createdAt: "desc" }
    });
    res.json(assignments);
};
exports.getTeacherAssignments = getTeacherAssignments;
const getParentLinks = async (req, res) => {
    try {
        const links = await prisma_1.default.parentChild.findMany({
            include: { parent: true, child: true },
            orderBy: { createdAt: "desc" }
        });
        res.json(links);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch parent links" });
    }
};
exports.getParentLinks = getParentLinks;
const linkParentToStudent = async (req, res) => {
    const { parentEmail, studentId } = req.body;
    if (!parentEmail || !studentId) {
        return res.status(400).json({ message: "Missing parentEmail or studentId" });
    }
    try {
        const parent = await prisma_1.default.profile.findUnique({ where: { email: parentEmail } });
        if (!parent)
            return res.status(404).json({ message: "Parent not found" });
        if (parent.role !== "PARENT")
            return res.status(400).json({ message: "User must be PARENT role" });
        const existing = await prisma_1.default.parentChild.findUnique({
            where: { parentId_childId: { parentId: parent.id, childId: studentId } }
        });
        if (existing)
            return res.status(400).json({ message: "Already linked" });
        const link = await prisma_1.default.parentChild.create({
            data: { parentId: parent.id, childId: studentId },
            include: { parent: true, child: true }
        });
        res.json(link);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to link parent" });
    }
};
exports.linkParentToStudent = linkParentToStudent;
const deleteParentLink = async (req, res) => {
    const linkId = req.params.linkId;
    if (!linkId) {
        return res.status(400).json({ message: "Link ID required" });
    }
    try {
        await prisma_1.default.parentChild.delete({ where: { id: linkId } });
        res.json({ message: "Link deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
};
exports.deleteParentLink = deleteParentLink;
const getAllParents = async (req, res) => {
    try {
        const parents = await prisma_1.default.profile.findMany({
            where: { role: "PARENT" },
            select: { id: true, fullName: true, email: true }
        });
        res.json(parents);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch parents" });
    }
};
exports.getAllParents = getAllParents;
//# sourceMappingURL=progress.controller.js.map