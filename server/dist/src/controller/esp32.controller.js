"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveGameSession = exports.getDeviceStatistics = exports.getDeviceStatus = exports.handleESP32Event = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const esp32_validation_1 = require("../utils/esp32-validation");
var ESP32EventType;
(function (ESP32EventType) {
    ESP32EventType["status"] = "status";
    ESP32EventType["game_start"] = "game_start";
    ESP32EventType["sensor_hit"] = "sensor_hit";
    ESP32EventType["game_complete"] = "game_complete";
})(ESP32EventType || (ESP32EventType = {}));
// Handle status event
const handleStatusEvent = async (deviceId, data) => {
    const { wifi_rssi, theme, in_game, uptime_sec } = data;
    await prisma_1.default.eSP32Device.upsert({
        where: { deviceId },
        update: {
            wifiRssi: wifi_rssi,
            theme,
            isOnline: true,
            uptimeSec: uptime_sec,
            lastSeen: new Date(),
        },
        create: {
            deviceId,
            wifiRssi: wifi_rssi,
            theme,
            isOnline: true,
            uptimeSec: uptime_sec,
            lastSeen: new Date(),
        },
    });
};
// Handle game start event
const handleGameStartEvent = async (deviceId, data) => {
    const { theme, total_steps } = data;
    const gameSession = await prisma_1.default.gameSession.create({
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
const handleSensorHitEvent = async (deviceId, data) => {
    const { sensor, correct, step } = data;
    // Get the latest active game session for this device
    const gameSession = await prisma_1.default.gameSession.findFirst({
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
    const sensorHit = await prisma_1.default.sensorHit.create({
        data: {
            gameSessionId: gameSession.id,
            sensorNumber: sensor,
            isCorrect: correct,
            step,
        },
    });
    // Update completed steps count
    await prisma_1.default.gameSession.update({
        where: { id: gameSession.id },
        data: {
            completedSteps: {
                increment: 1,
            },
        },
    });
    return sensorHit;
};
// Handle game complete event
const handleGameCompleteEvent = async (deviceId, data) => {
    const { duration_sec, total_steps } = data;
    // Get the latest active game session
    const gameSession = await prisma_1.default.gameSession.findFirst({
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
    const completedSession = await prisma_1.default.gameSession.update({
        where: { id: gameSession.id },
        data: {
            isCompleted: true,
            durationSec: duration_sec,
            completedAt: new Date(),
        },
    });
    return completedSession;
};
// Main event handler endpoint
const handleESP32Event = async (req, res) => {
    try {
        const payload = req.body;
        // Validate payload using Zod schema
        const validation = (0, esp32_validation_1.validateESP32Event)(payload);
        if (!validation.valid) {
            res.status(400).json({
                error: "Invalid event payload",
                details: validation.errors,
            });
            return;
        }
        const { device_id, event: eventType, data } = validation.data;
        // Store raw event in database
        await prisma_1.default.eSP32Event.create({
            data: {
                deviceId: device_id,
                eventType: eventType,
                payload,
            },
        });
        // Route to specific event handler
        let response = { success: true, event: eventType };
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
    }
    catch (error) {
        console.error("Error handling ESP32 event:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.handleESP32Event = handleESP32Event;
// Helper function to get device status
const getDeviceStatus = async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        if (!deviceId) {
            res.status(400).json({ error: "deviceId is required" });
            return;
        }
        const device = await prisma_1.default.eSP32Device.findUnique({
            where: { deviceId },
        });
        if (!device) {
            res.status(404).json({ error: "Device not found" });
            return;
        }
        res.status(200).json(device);
    }
    catch (error) {
        console.error("Error getting device status:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.getDeviceStatus = getDeviceStatus;
// Helper function to get device statistics
const getDeviceStatistics = async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        if (!deviceId) {
            res.status(400).json({ error: "deviceId is required" });
            return;
        }
        const device = await prisma_1.default.eSP32Device.findUnique({
            where: { deviceId },
        });
        if (!device) {
            res.status(404).json({ error: "Device not found" });
            return;
        }
        const gameSessions = await prisma_1.default.gameSession.findMany({
            where: { deviceId, isCompleted: true },
        });
        const totalGamesCompleted = gameSessions.length;
        const averageDuration = gameSessions.length > 0
            ? gameSessions.reduce((sum, session) => sum + (session.durationSec || 0), 0) /
                gameSessions.length
            : 0;
        const recentSessions = await prisma_1.default.gameSession.findMany({
            where: { deviceId },
            take: 10,
            orderBy: { startedAt: "desc" },
            include: {
                sensorHits: true,
            },
        });
        res.status(200).json({
            device,
            statistics: {
                totalGamesCompleted,
                averageDuration: Math.round(averageDuration),
                recentSessions,
            },
        });
    }
    catch (error) {
        console.error("Error getting device statistics:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.getDeviceStatistics = getDeviceStatistics;
// Get active game session
const getActiveGameSession = async (req, res) => {
    try {
        const deviceId = req.params.deviceId;
        if (!deviceId) {
            res.status(400).json({ error: "deviceId is required" });
            return;
        }
        const activeSession = await prisma_1.default.gameSession.findFirst({
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
    }
    catch (error) {
        console.error("Error getting active game session:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.getActiveGameSession = getActiveGameSession;
//# sourceMappingURL=esp32.controller.js.map