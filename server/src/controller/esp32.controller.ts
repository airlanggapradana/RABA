import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { validateESP32Event } from "../utils/esp32-validation";

enum ESP32EventType {
  status = "status",
  game_start = "game_start",
  sensor_hit = "sensor_hit",
  game_complete = "game_complete",
}

interface ESP32EventPayload {
  device_id: string;
  event: string;
  data: any;
}

// Handle status event - OPTIMIZED: single upsert dengan event create
const handleStatusEvent = async (deviceId: string, data: any) => {
  const { wifi_rssi, theme, in_game, uptime_sec } = data;

  // Don't upsert here - already done in main handler
  // Just update the device with status data
  await prisma.eSP32Device.update({
    where: { deviceId },
    data: {
      wifiRssi: wifi_rssi,
      theme,
      isOnline: true,
      uptimeSec: uptime_sec,
      lastSeen: new Date(),
    },
  });
};

// Handle game start event
const handleGameStartEvent = async (deviceId: string, data: any) => {
  const { theme, total_steps } = data;

  const gameSession = await prisma.gameSession.create({
    data: {
      deviceId,
      theme,
      totalSteps: total_steps,
      startedAt: new Date(),
    },
  });

  return gameSession;
};

// Handle sensor hit event
const handleSensorHitEvent = async (deviceId: string, data: any) => {
  const { sensor, correct, step, theme } = data;

  // Get the latest active game session for this device
  const gameSession = await prisma.gameSession.findFirst({
    where: {
      deviceId,
      isCompleted: false,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (!gameSession) {
    console.warn(`No active game session found for device ${deviceId}`);
    return null;
  }

  const sensorHit = await prisma.sensorHit.create({
    data: {
      gameSessionId: gameSession.id,
      sensorNumber: sensor,
      isCorrect: correct,
      step,
    },
  });

  // Update completed steps count
  await prisma.gameSession.update({
    where: { id: gameSession.id },
    data: {
      completedSteps: {
        increment: 1,
      },
    },
  });

  // Update media_progress - mark specific step only (not all)
  try {
    const device = await prisma.eSP32Device.findUnique({
      where: { deviceId },
      select: { ownerId: true },
    });

    if (device?.ownerId && theme && step) {
      // Parse step: "4/9" → 4
      const stepNumber = parseInt(step.split('/')[0], 10);
      
      // Get the theme assignment for this student and theme
      const themeAssignment = await prisma.themeAssignment.findFirst({
        where: {
          studentId: device.ownerId,
          theme,
        },
        select: { id: true },
      });

      if (themeAssignment) {
        // Get all media progress for this theme assignment, sorted by creation
        const mediaProgresses = await prisma.mediaProgress.findMany({
          where: {
            themeAssignmentId: themeAssignment.id,
            mediaType: "AUDIO" as any,
          },
          orderBy: { createdAt: "asc" },
        });

        // Update only the specific step (stepNumber is 1-indexed)
        if (stepNumber > 0 && stepNumber <= mediaProgresses.length) {
          const targetMedia = mediaProgresses[stepNumber - 1]!;
          
          await prisma.mediaProgress.update({
            where: { id: targetMedia.id },
            data: {
              openedAt: new Date(),
            },
          });
        }
      }
    }
  } catch (err) {
    console.warn(`Failed to update media_progress for sensor hit: ${err}`);
  }

  return sensorHit;
};

// Handle game complete event
const handleGameCompleteEvent = async (deviceId: string, data: any) => {
  const { duration_sec, total_steps, theme } = data;

  // Get the latest active game session
  const gameSession = await prisma.gameSession.findFirst({
    where: {
      deviceId,
      isCompleted: false,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (!gameSession) {
    console.warn(`No active game session found for device ${deviceId}`);
    return null;
  }

  const completedSession = await prisma.gameSession.update({
    where: { id: gameSession.id },
    data: {
      isCompleted: true,
      durationSec: duration_sec,
      completedAt: new Date(),
    },
  });

  // Update media_progress to track completion
  try {
    const device = await prisma.eSP32Device.findUnique({
      where: { deviceId },
      select: { ownerId: true },
    });

    if (device?.ownerId && theme) {
      const themeAssignment = await prisma.themeAssignment.findFirst({
        where: {
          studentId: device.ownerId,
          theme,
        },
        select: { id: true },
      });

      if (themeAssignment) {
        // Mark all audio files as opened (game complete = student finished the audio set)
        await prisma.mediaProgress.updateMany({
          where: {
            themeAssignmentId: themeAssignment.id,
            mediaType: "AUDIO" as any,
          },
          data: {
            openedAt: new Date(),
            downloadedAt: new Date(), // Mark as downloaded/completed
          },
        });
      }
    }
  } catch (err) {
    console.warn(`Failed to update media_progress for game complete: ${err}`);
  }

  return completedSession;
};

// Main event handler endpoint
export const handleESP32Event = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = req.body;

    // Validate payload using Zod schema
    const validation = validateESP32Event(payload);
    if (!validation.valid) {
      res.status(400).json({
        error: "Invalid event payload",
        details: validation.errors,
      });
      return;
    }

    const { device_id, event: eventType, data } = validation.data!;

    // Ensure device exists before creating event (for foreign key constraint)
    await prisma.eSP32Device.upsert({
      where: { deviceId: device_id },
      update: {},
      create: {
        deviceId: device_id,
        isOnline: true,
        lastSeen: new Date(),
      },
    });

    // Store raw event in database
    await prisma.eSP32Event.create({
      data: {
        deviceId: device_id,
        eventType: eventType as ESP32EventType,
        payload,
      },
    });

    // Route to specific event handler
    let response: any = { success: true, event: eventType };

    switch (eventType) {
      case ESP32EventType.status:
        await handleStatusEvent(device_id, data);
        response.message = "Device status updated";
        break;

      case ESP32EventType.game_start:
        const gameSession = await handleGameStartEvent(device_id, data);
        response.message = "Game session started";
        response.gameSessionId = gameSession.id;
        break;

      case ESP32EventType.sensor_hit:
        const sensorHit = await handleSensorHitEvent(device_id, data);
        response.message = "Sensor hit recorded";
        if (sensorHit) {
          response.sensorHitId = sensorHit.id;
        }
        break;

      case ESP32EventType.game_complete:
        const completedSession = await handleGameCompleteEvent(device_id, data);
        response.message = "Game session completed";
        if (completedSession) {
          response.durationSec = completedSession.durationSec;
        }
        break;

      default:
        res.status(400).json({
          error: `Unknown event type: ${eventType}`,
        });
        return;
    }

    res.status(200).json(response);
  } catch (error: any) {
    console.error("Error handling ESP32 event:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// Helper function to get device status
export const getDeviceStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deviceId = req.params.deviceId as string;

    if (!deviceId) {
      res.status(400).json({ error: "deviceId is required" });
      return;
    }

    const device = await prisma.eSP32Device.findUnique({
      where: { deviceId },
    });

    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    res.status(200).json(device);
  } catch (error: any) {
    console.error("Error getting device status:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// Helper function to get device statistics - OPTIMIZED
export const getDeviceStatistics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deviceId = req.params.deviceId as string;

    if (!deviceId) {
      res.status(400).json({ error: "deviceId is required" });
      return;
    }

    // Get device with optimized select to avoid N+1
    const device = await prisma.eSP32Device.findUnique({
      where: { deviceId },
      select: {
        id: true,
        deviceId: true,
        theme: true,
        wifiRssi: true,
        isOnline: true,
        lastSeen: true,
        uptimeSec: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    // Get stats using aggregation instead of fetching all records
    const stats = await prisma.gameSession.aggregate({
      where: { deviceId, isCompleted: true },
      _count: true,
      _avg: { durationSec: true },
    });

    const totalGamesCompleted = stats._count;
    const averageDuration = Math.round(stats._avg.durationSec || 0);

    // Get recent sessions with their sensor hits in one query
    const recentSessions = await prisma.gameSession.findMany({
      where: { deviceId },
      take: 10,
      orderBy: { startedAt: "desc" },
      select: {
        id: true,
        deviceId: true,
        theme: true,
        totalSteps: true,
        completedSteps: true,
        startedAt: true,
        completedAt: true,
        durationSec: true,
        isCompleted: true,
        createdAt: true,
        sensorHits: {
          select: {
            id: true,
            sensorNumber: true,
            isCorrect: true,
            step: true,
            createdAt: true,
          },
        },
      },
    });

    res.status(200).json({
      device,
      statistics: {
        totalGamesCompleted,
        averageDuration,
        recentSessions,
      },
    });
  } catch (error: any) {
    console.error("Error getting device statistics:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// Get active game session
export const getActiveGameSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deviceId = req.params.deviceId as string;

    if (!deviceId) {
      res.status(400).json({ error: "deviceId is required" });
      return;
    }

    const activeSession = await prisma.gameSession.findFirst({
      where: { deviceId, isCompleted: false },
      orderBy: { startedAt: "desc" },
      include: {
        sensorHits: true,
      },
    });

    if (!activeSession) {
      res.status(404).json({ message: "No active game session" });
      return;
    }

    res.status(200).json(activeSession);
  } catch (error: any) {
    console.error("Error getting active game session:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// Assign device to student (untuk link ESP32Device ke student profile)
export const assignDeviceToStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { deviceId, studentId } = req.body;

    if (!deviceId || !studentId) {
      res.status(400).json({ error: "deviceId and studentId are required" });
      return;
    }

    // Verify student exists
    const student = await prisma.profile.findUnique({
      where: { id: studentId },
      select: { id: true, fullName: true },
    });

    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    // Ensure device exists
    const device = await prisma.eSP32Device.findUnique({
      where: { deviceId },
      select: { id: true, deviceId: true },
    });

    if (!device) {
      // Create device if doesn't exist
      await prisma.eSP32Device.create({
        data: {
          deviceId,
          ownerId: studentId,
          isOnline: false,
          lastSeen: new Date(),
        },
      });
    } else {
      // Update existing device with student ID
      await prisma.eSP32Device.update({
        where: { deviceId },
        data: { ownerId: studentId },
      });
    }

    res.status(200).json({
      message: "Device assigned to student successfully",
      deviceId,
      studentId,
      studentName: student.fullName,
    });
  } catch (error: any) {
    console.error("Error assigning device to student:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
