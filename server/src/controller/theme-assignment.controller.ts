import { Response } from "express";
import prisma from "../../prisma/prisma";
import { AuthRequest } from "../middleware/auth";

// Teacher: Assign theme to student (dengan semua audio + image dalam tema tersebut)
export const assignThemeToStudent = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;
  const { studentId, theme } = req.body;

  if (!studentId || !theme) {
    return res.status(400).json({ message: "Student ID and theme required" });
  }

  try {
    // Check if theme assignment already exists
    const existingAssignment = await prisma.themeAssignment.findUnique({
      where: {
        teacherId_theme_studentId: {
          teacherId,
          theme,
          studentId
        }
      }
    });

    if (existingAssignment) {
      return res.status(400).json({ message: "Theme already assigned to this student" });
    }

    // Get all audios and images in this theme
    const [audios, images] = await Promise.all([
      prisma.audioFile.findMany({
        where: { theme, createdBy: teacherId }
      }),
      prisma.image.findMany({
        where: { theme, createdBy: teacherId }
      })
    ]);

    // Create theme assignment
    const themeAssignment = await prisma.themeAssignment.create({
      data: {
        teacherId,
        studentId,
        theme,
        mediaProgresses: {
          create: [
            ...audios.map(audio => ({
              mediaId: audio.id,
              mediaType: "AUDIO" as any
            })),
            ...images.map(image => ({
              mediaId: image.id,
              mediaType: "IMAGE" as any
            }))
          ]
        }
      },
      include: { mediaProgresses: true }
    });

    res.json({
      message: "Theme assigned successfully",
      assignment: themeAssignment
    });
  } catch (error) {
    console.error("Assign theme error:", error);
    res.status(500).json({ message: "Failed to assign theme", error: String(error) });
  }
};

// Teacher: Remove theme assignment from student
export const removeThemeAssignment = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;
  const { assignmentId } = req.params;

  if (!assignmentId) {
    return res.status(400).json({ message: "Assignment ID required" });
  }

  try {
    const assignment = await prisma.themeAssignment.findFirst({
      where: { id: assignmentId }
    });

    if (!assignment || assignment.teacherId !== teacherId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.themeAssignment.delete({
      where: { id: assignmentId }
    });

    res.json({ message: "Theme assignment removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove assignment" });
  }
};

// Teacher: Get all theme assignments they've made
export const getTeacherThemeAssignments = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;

  try {
    const assignments = await prisma.themeAssignment.findMany({
      where: { teacherId },
      include: {
        student: {
          select: { id: true, fullName: true, email: true }
        },
        mediaProgresses: true
      },
      orderBy: { createdAt: "desc" }
    });

    // Calculate progress for each theme assignment
    const assignmentsWithProgress = assignments.map((assignment: any) => {
      const totalMedia = assignment.mediaProgresses.length;
      const openedMedia = assignment.mediaProgresses.filter((m: any) => m.openedAt).length;
      const percentage = totalMedia > 0 ? Math.round((openedMedia / totalMedia) * 100) : 0;

      return {
        ...assignment,
        totalMedia,
        openedMedia,
        percentage
      };
    });

    res.json(assignmentsWithProgress);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

// Student: Get all theme assignments assigned to them
export const getStudentThemeAssignments = async (req: AuthRequest, res: Response) => {
  const studentId = req.auth!.userId;

  try {
    const assignments = await prisma.themeAssignment.findMany({
      where: { studentId },
      include: {
        teacher: {
          select: { id: true, fullName: true }
        },
        mediaProgresses: true
      },
      orderBy: { createdAt: "desc" }
    });

    // Get audio and image details for each media
    const assignmentsWithDetails = await Promise.all(
      assignments.map(async (assignment: any) => {
        const mediaDetails = await Promise.all(
          assignment.mediaProgresses.map(async (progress: any) => {
            if (progress.mediaType === "AUDIO") {
              const audio = await prisma.audioFile.findUnique({
                where: { id: progress.mediaId },
                select: { id: true, title: true, audioUrl: true }
              });
              return { ...progress, details: audio };
            } else {
              const image = await prisma.image.findUnique({
                where: { id: progress.mediaId },
                select: { id: true, title: true, imageUrl: true }
              });
              return { ...progress, details: image };
            }
          })
        );

        const totalMedia = mediaDetails.length;
        const openedMedia = mediaDetails.filter(m => m.openedAt).length;
        const percentage = totalMedia > 0 ? Math.round((openedMedia / totalMedia) * 100) : 0;

        return {
          id: assignment.id,
          theme: assignment.theme,
          teacher: assignment.teacher,
          totalMedia,
          openedMedia,
          percentage,
          media: mediaDetails,
          createdAt: assignment.createdAt
        };
      })
    );

    res.json(assignmentsWithDetails);
  } catch (error) {
    console.error("Get student assignments error:", error);
    res.status(500).json({ message: "Failed to fetch assignments", error: String(error) });
  }
};

// Student: Mark media as opened
export const markMediaOpened = async (req: AuthRequest, res: Response) => {
  const studentId = req.auth!.userId;
  const { assignmentId, mediaId } = req.body;

  if (!assignmentId || !mediaId) {
    return res.status(400).json({ message: "Assignment ID and Media ID required" });
  }

  try {
    // Verify student owns this assignment
    const assignment = await prisma.themeAssignment.findFirst({
      where: { id: assignmentId }
    });

    if (!assignment || assignment.studentId !== studentId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update or create media progress
    const mediaProgress = await prisma.mediaProgress.upsert({
      where: {
        themeAssignmentId_mediaId: {
          themeAssignmentId: assignmentId,
          mediaId
        }
      },
      update: { openedAt: new Date() },
      create: {
        themeAssignmentId: assignmentId,
        mediaId,
        mediaType: "AUDIO" as any,
        openedAt: new Date()
      }
    });

    res.json({ message: "Media marked as opened", mediaProgress });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark media as opened" });
  }
};

// Student: Mark media as downloaded
export const markMediaDownloaded = async (req: AuthRequest, res: Response) => {
  const studentId = req.auth!.userId;
  const { assignmentId, mediaId } = req.body;

  if (!assignmentId || !mediaId) {
    return res.status(400).json({ message: "Assignment ID and Media ID required" });
  }

  try {
    // Verify student owns this assignment
    const assignment = await prisma.themeAssignment.findFirst({
      where: { id: assignmentId }
    });

    if (!assignment || assignment.studentId !== studentId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update or create media progress
    const mediaProgress = await prisma.mediaProgress.upsert({
      where: {
        themeAssignmentId_mediaId: {
          themeAssignmentId: assignmentId,
          mediaId
        }
      },
      update: { 
        downloadedAt: new Date(),
        openedAt: new Date() // Also mark as opened if not yet
      },
      create: {
        themeAssignmentId: assignmentId,
        mediaId,
        mediaType: "AUDIO" as any,
        downloadedAt: new Date(),
        openedAt: new Date()
      }
    });

    res.json({ message: "Media marked as downloaded", mediaProgress });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark media as downloaded" });
  }
};
