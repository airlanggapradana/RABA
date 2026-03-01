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

    // Get all audios and images in this theme - Filter by createdBy to ensure teacher's own media
    const [audios, images] = await Promise.all([
      prisma.audioFile.findMany({
        where: { 
          theme, 
          createdBy: teacherId  // IMPORTANT: Filter by teacher
        }
      }),
      prisma.image.findMany({
        where: { 
          theme, 
          createdBy: teacherId  // IMPORTANT: Filter by teacher
        }
      })
    ]);

    // Validate that theme has media
    if (audios.length === 0 && images.length === 0) {
      return res.status(400).json({ 
        message: "Theme has no media",
        details: "Please upload at least 1 audio or image to this theme first"
      });
    }

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
      assignment: {
        ...themeAssignment,
        audioCount: audios.length,
        imageCount: images.length,
        totalMedia: audios.length + images.length
      }
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

// Get detailed progress for debugging (shows exactly which media is opened)
export const getAssignmentDetailedProgress = async (req: AuthRequest, res: Response) => {
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

    // Get all media progress with actual media details
    const mediaProgresses = await prisma.mediaProgress.findMany({
      where: { themeAssignmentId: assignmentId },
      orderBy: { createdAt: "asc" }
    });

    // Get details for each media
    const detailedProgress = await Promise.all(
      mediaProgresses.map(async (progress: any) => {
        let mediaDetails: any = { id: progress.mediaId };
        
        if (progress.mediaType === "AUDIO") {
          const audio = await prisma.audioFile.findUnique({
            where: { id: progress.mediaId },
            select: { id: true, title: true, theme: true }
          });
          mediaDetails = { ...mediaDetails, ...audio, mediaType: "AUDIO" };
        } else {
          const image = await prisma.image.findUnique({
            where: { id: progress.mediaId },
            select: { id: true, title: true, theme: true }
          });
          mediaDetails = { ...mediaDetails, ...image, mediaType: "IMAGE" };
        }

        return {
          progressId: progress.id,
          mediaType: progress.mediaType,
          mediaDetails,
          openedAt: progress.openedAt,
          downloadedAt: progress.downloadedAt,
          isOpened: !!progress.openedAt
        };
      })
    );

    const audioOpened = detailedProgress.filter((p: any) => p.mediaType === "AUDIO" && p.isOpened).length;
    const audioTotal = detailedProgress.filter((p: any) => p.mediaType === "AUDIO").length;
    const imageOpened = detailedProgress.filter((p: any) => p.mediaType === "IMAGE" && p.isOpened).length;
    const imageTotal = detailedProgress.filter((p: any) => p.mediaType === "IMAGE").length;
    const totalOpened = audioOpened + imageOpened;
    const totalMedia = audioTotal + imageTotal;

    res.json({
      assignmentId,
      theme: assignment.theme,
      createdAt: assignment.createdAt,
      updatedAt: assignment.updatedAt,
      progress: {
        audio: `${audioOpened}/${audioTotal}`,
        image: `${imageOpened}/${imageTotal}`,
        total: `${totalOpened}/${totalMedia}`,
        percentage: totalMedia > 0 ? Math.round((totalOpened / totalMedia) * 100) : 0
      },
      media: detailedProgress
    });
  } catch (error) {
    console.error("Get detailed progress error:", error);
    res.status(500).json({ message: "Failed to fetch detailed progress" });
  }
};

// Get theme media count (helper endpoint)

export const getThemeMediaCount = async (req: AuthRequest, res: Response) => {
  const teacherId = req.auth!.userId;
  const { theme } = req.params;

  if (!theme) {
    return res.status(400).json({ message: "Theme required" });
  }

  try {
    const [audioCount, imageCount] = await Promise.all([
      prisma.audioFile.count({
        where: { theme, createdBy: teacherId }
      }),
      prisma.image.count({
        where: { theme, createdBy: teacherId }
      })
    ]);

    res.json({
      theme,
      audioCount,
      imageCount,
      totalMedia: audioCount + imageCount,
      maxPerTheme: 9,
      audioCanAdd: Math.max(0, 9 - audioCount),
      imagesCanAdd: Math.max(0, 9 - imageCount)
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch theme media count" });
  }
};

// Clear/reset all media progress for a theme assignment (keep assignment, reset progress)
export const clearThemeAssignmentProgress = async (req: AuthRequest, res: Response) => {
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

    // Delete all media progress records for this assignment
    const deleted = await prisma.mediaProgress.deleteMany({
      where: { themeAssignmentId: assignmentId }
    });

    // Recreate fresh media progress records - get audios and images for THIS TEACHER's theme
    // IMPORTANT: Filter by createdBy to avoid mixing media from other teachers
    const audios = await prisma.audioFile.findMany({
      where: { 
        theme: assignment.theme,
        createdBy: teacherId  // Filter by teacher to ensure we only get their media
      },
      select: { id: true }
    });

    const images = await prisma.image.findMany({
      where: { 
        theme: assignment.theme,
        createdBy: teacherId  // Filter by teacher to ensure we only get their media
      },
      select: { id: true }
    });

    // Create new media progress records - ONLY for properly filtered media
    const createData = [
      ...audios.map(audio => ({
        themeAssignmentId: assignmentId,
        mediaId: audio.id,
        mediaType: "AUDIO" as any
      })),
      ...images.map(image => ({
        themeAssignmentId: assignmentId,
        mediaId: image.id,
        mediaType: "IMAGE" as any
      }))
    ];

    const created = await prisma.mediaProgress.createMany({
      data: createData
    });

    res.json({
      message: "Theme assignment progress cleared and reset",
      cleared: deleted.count,
      recreated: created.count,
      audioCount: audios.length,
      imageCount: images.length,
      totalMedia: audios.length + images.length
    });
  } catch (error) {
    console.error("Clear progress error:", error);
    res.status(500).json({ message: "Failed to clear progress", error: String(error) });
  }
};
