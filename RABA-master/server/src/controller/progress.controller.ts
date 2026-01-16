import { Response } from "express";
import prisma from "../../prisma/prisma";
import { AuthRequest } from "../middleware/auth";

// Student: get hanya audio yang di-assign oleh teacher
export const myProgress = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  
  // Get audios assigned to this student by any teacher
  const assignedAudios = await prisma.teacherAudioAssignment.findMany({
    where: { studentId: userId },
    include: { audio: true },
    orderBy: { createdAt: "desc" }
  });

  const progress = await prisma.userProgress.findMany({
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

// Teacher: lihat hanya student yang punya assignment dari teacher ini
export const teacherChildrenProgress = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;

  // Get unique students assigned by this teacher
  const studentIds = await prisma.teacherAudioAssignment.findMany({
    where: { teacherId },
    distinct: ["studentId"],
    select: { studentId: true }
  });

  const uniqueStudentIds = [...new Set(studentIds.map(s => s.studentId))];
  const students = await prisma.profile.findMany({
    where: { id: { in: uniqueStudentIds }, role: "CHILD" }
  });

  // Get audios assigned by this teacher
  const assignedAudios = await prisma.teacherAudioAssignment.findMany({
    where: { teacherId },
    distinct: ["audioId"],
    select: { audioId: true }
  });

  const uniqueAudioIds = [...new Set(assignedAudios.map(a => a.audioId))];
  const totalAudio = uniqueAudioIds.length;

  const result = await Promise.all(students.map(async (s) => {
    const played = await prisma.userProgress.count({
      where: {
        userId: s.id,
        audioId: { in: uniqueAudioIds },
        openedAt: { not: null }
      }
    });
    const downloaded = await prisma.userProgress.count({
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

// Parent: lihat hanya student mereka sendiri
export const parentChildrenProgress = async (req: AuthRequest, res: Response) => {
  const parentId = req.auth!.userId;
  
  const links = await prisma.parentChild.findMany({
    where: { parentId },
    include: { child: true }
  });

  // Get all audios assigned to any of their children
  const childIds = links.map(l => l.childId);
  const assignedAudios = await prisma.teacherAudioAssignment.findMany({
    where: { studentId: { in: childIds } },
    distinct: ["audioId"],
    select: { audioId: true }
  });

  const uniqueAudioIds = [...new Set(assignedAudios.map(a => a.audioId))];
  const totalAudio = uniqueAudioIds.length;

  const result = await Promise.all(links.map(async (l) => {
    const played = await prisma.userProgress.count({
      where: {
        userId: l.childId,
        audioId: { in: uniqueAudioIds },
        openedAt: { not: null }
      }
    });
    const downloaded = await prisma.userProgress.count({
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

export const getAudioFiles = async (req: any, res: Response) => {
  const audios = await prisma.audioFile.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(audios);
};

// Teacher assign audio ke student
export const assignAudioToStudent = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;
  const { audioId, studentId } = req.body;

  if (!audioId || !studentId) {
    return res.status(400).json({ message: "Missing audioId or studentId" });
  }

  const existing = await prisma.teacherAudioAssignment.findUnique({
    where: { teacherId_audioId_studentId: { teacherId, audioId, studentId } }
  });

  if (existing) {
    return res.status(400).json({ message: "Already assigned" });
  }

  const assignment = await prisma.teacherAudioAssignment.create({
    data: { teacherId, audioId, studentId }
  });

  res.json(assignment);
};

// Remove assignment
export const removeAudioAssignment = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;
  const { audioId, studentId } = req.body;

  if (!audioId || !studentId) {
    return res.status(400).json({ message: "Missing audioId or studentId" });
  }

  const result = await prisma.teacherAudioAssignment.delete({
    where: { teacherId_audioId_studentId: { teacherId, audioId, studentId } }
  });

  res.json(result);
};

export const markAudioOpened = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  const { audioId } = req.body;
  
  if (!audioId) return res.status(400).json({ message: "Missing audioId" });

  const existing = await prisma.userProgress.findUnique({
    where: { userId_audioId: { userId, audioId } }
  });

  if (existing && existing.openedAt) {
    return res.json({ message: "Already marked" });
  }

  const progress = await prisma.userProgress.upsert({
    where: { userId_audioId: { userId, audioId } },
    update: { openedAt: new Date() },
    create: { userId, audioId, openedAt: new Date() }
  });

  res.json(progress);
};

export const markAudioDownloaded = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  const { audioId } = req.body;
  
  if (!audioId) return res.status(400).json({ message: "Missing audioId" });

  const progress = await prisma.userProgress.upsert({
    where: { userId_audioId: { userId, audioId } },
    update: { downloadedAt: new Date() },
    create: { userId, audioId, downloadedAt: new Date() }
  });

  res.json(progress);
};

export const getAllStudents = async (req: AuthRequest, res: Response) => {
  const students = await prisma.profile.findMany({ where: { role: "CHILD" } });
  res.json(students);
};

export const getTeacherAssignments = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;
  const assignments = await prisma.teacherAudioAssignment.findMany({
    where: { teacherId },
    include: { audio: true, student: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(assignments);
};

export const getParentLinks = async (req: AuthRequest, res: Response) => {
  try {
    const links = await prisma.parentChild.findMany({
      include: { parent: true, child: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch parent links" });
  }
};

export const linkParentToStudent = async (req: AuthRequest, res: Response) => {
  const { parentEmail, studentId } = req.body;

  if (!parentEmail || !studentId) {
    return res.status(400).json({ message: "Missing parentEmail or studentId" });
  }

  try {
    const parent = await prisma.profile.findUnique({ where: { email: parentEmail } });
    if (!parent) return res.status(404).json({ message: "Parent not found" });
    if (parent.role !== "PARENT") return res.status(400).json({ message: "User must be PARENT role" });

    const existing = await prisma.parentChild.findUnique({
      where: { parentId_childId: { parentId: parent.id, childId: studentId } }
    });

    if (existing) return res.status(400).json({ message: "Already linked" });

    const link = await prisma.parentChild.create({
      data: { parentId: parent.id, childId: studentId },
      include: { parent: true, child: true }
    });

    res.json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to link parent" });
  }
};

export const deleteParentLink = async (req: AuthRequest, res: Response) => {
  const linkId = req.params.linkId;

  if (!linkId) {
    return res.status(400).json({ message: "Link ID required" });
  }

  try {
    await prisma.parentChild.delete({ where: { id: linkId } });
    res.json({ message: "Link deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getAllParents = async (req: AuthRequest, res: Response) => {
  try {
    const parents = await prisma.profile.findMany({ 
      where: { role: "PARENT" },
      select: { id: true, fullName: true, email: true }
    });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch parents" });
  }
};