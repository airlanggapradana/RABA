"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateESP32Event = exports.esp32EventSchema = void 0;
const zod_1 = require("zod");
// Device ID validation
const deviceIdSchema = zod_1.z
    .string()
    .min(1, "device_id is required")
    .regex(/^RABA_\d{3}$/, "device_id must be in format RABA_XXX");
// Event type validation
const eventTypeSchema = zod_1.z.enum(["status", "game_start", "sensor_hit", "game_complete"]);
// Status event payload
const statusEventSchema = zod_1.z.object({
    device_id: deviceIdSchema,
    event: zod_1.z.literal("status"),
    data: zod_1.z.object({
        wifi_rssi: zod_1.z.number().int().min(-120).max(0),
        theme: zod_1.z.string().optional(),
        in_game: zod_1.z.boolean(),
        uptime_sec: zod_1.z.number().int().min(0),
    }),
});
// Game start event payload
const gameStartEventSchema = zod_1.z.object({
    device_id: deviceIdSchema,
    event: zod_1.z.literal("game_start"),
    data: zod_1.z.object({
        theme: zod_1.z.string().min(1, "theme is required"),
        total_steps: zod_1.z.number().int().min(1),
    }),
});
// Sensor hit event payload
const sensorHitEventSchema = zod_1.z.object({
    device_id: deviceIdSchema,
    event: zod_1.z.literal("sensor_hit"),
    data: zod_1.z.object({
        sensor: zod_1.z.number().int().min(1).max(16),
        correct: zod_1.z.boolean(),
        step: zod_1.z.string().regex(/^\d+\/\d+$/, 'step must be in format "X/Y"'),
        theme: zod_1.z.string().min(1),
    }),
});
// Game complete event payload
const gameCompleteEventSchema = zod_1.z.object({
    device_id: deviceIdSchema,
    event: zod_1.z.literal("game_complete"),
    data: zod_1.z.object({
        theme: zod_1.z.string().min(1),
        duration_sec: zod_1.z.number().int().min(0),
        total_steps: zod_1.z.number().int().min(1),
    }),
});
// Union of all event schemas
exports.esp32EventSchema = zod_1.z.discriminatedUnion("event", [
    statusEventSchema,
    gameStartEventSchema,
    sensorHitEventSchema,
    gameCompleteEventSchema,
]);
// Validation helper
const validateESP32Event = (data) => {
    try {
        const validated = exports.esp32EventSchema.parse(data);
        return { valid: true, data: validated };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const errors = error.issues.map((issue) => {
                const path = issue.path.join(".");
                return `${path || "field"}: ${issue.message}`;
            });
            return { valid: false, errors };
        }
        return { valid: false, errors: ["Validation error"] };
    }
};
exports.validateESP32Event = validateESP32Event;
//# sourceMappingURL=esp32-validation.js.map