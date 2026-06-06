import { z } from "zod";

// Device ID validation
const deviceIdSchema = z
  .string()
  .min(1, "device_id is required")
  .regex(/^RABA_\d{3}$/, "device_id must be in format RABA_XXX");

// Event type validation
const eventTypeSchema = z.enum(["status", "game_start", "sensor_hit", "game_complete"]);

// Status event payload
const statusEventSchema = z.object({
  device_id: deviceIdSchema,
  event: z.literal("status"),
  data: z.object({
    wifi_rssi: z.number().int().min(-120).max(0),
    theme: z.string().optional(),
    in_game: z.boolean(),
    uptime_sec: z.number().int().min(0),
  }),
});

// Game start event payload
const gameStartEventSchema = z.object({
  device_id: deviceIdSchema,
  event: z.literal("game_start"),
  data: z.object({
    theme: z.string().min(1, "theme is required"),
    total_steps: z.number().int().min(1),
  }),
});

// Sensor hit event payload
const sensorHitEventSchema = z.object({
  device_id: deviceIdSchema,
  event: z.literal("sensor_hit"),
  data: z.object({
    sensor: z.number().int().min(1).max(16),
    correct: z.boolean(),
    step: z.string().regex(/^\d+\/\d+$/, 'step must be in format "X/Y"'),
    theme: z.string().min(1),
  }),
});

// Game complete event payload
const gameCompleteEventSchema = z.object({
  device_id: deviceIdSchema,
  event: z.literal("game_complete"),
  data: z.object({
    theme: z.string().min(1),
    duration_sec: z.number().int().min(0),
    total_steps: z.number().int().min(1),
  }),
});

// Union of all event schemas
export const esp32EventSchema = z.discriminatedUnion("event", [
  statusEventSchema,
  gameStartEventSchema,
  sensorHitEventSchema,
  gameCompleteEventSchema,
]);

export type ESP32Event = z.infer<typeof esp32EventSchema>;
export type StatusEvent = z.infer<typeof statusEventSchema>;
export type GameStartEvent = z.infer<typeof gameStartEventSchema>;
export type SensorHitEvent = z.infer<typeof sensorHitEventSchema>;
export type GameCompleteEvent = z.infer<typeof gameCompleteEventSchema>;

// Validation helper
export const validateESP32Event = (
  data: unknown
): { valid: boolean; data?: ESP32Event; errors?: string[] } => {
  try {
    const validated = esp32EventSchema.parse(data);
    return { valid: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => {
        const path = issue.path.join(".");
        return `${path || "field"}: ${issue.message}`;
      });
      return { valid: false, errors };
    }
    return { valid: false, errors: ["Validation error"] };
  }
};
