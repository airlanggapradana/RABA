import { z } from "zod";
declare const statusEventSchema: z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"status">;
    data: z.ZodObject<{
        wifi_rssi: z.ZodNumber;
        theme: z.ZodOptional<z.ZodString>;
        in_game: z.ZodBoolean;
        uptime_sec: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const gameStartEventSchema: z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"game_start">;
    data: z.ZodObject<{
        theme: z.ZodString;
        total_steps: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const sensorHitEventSchema: z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"sensor_hit">;
    data: z.ZodObject<{
        sensor: z.ZodNumber;
        correct: z.ZodBoolean;
        step: z.ZodString;
        theme: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const gameCompleteEventSchema: z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"game_complete">;
    data: z.ZodObject<{
        theme: z.ZodString;
        duration_sec: z.ZodNumber;
        total_steps: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const esp32EventSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"status">;
    data: z.ZodObject<{
        wifi_rssi: z.ZodNumber;
        theme: z.ZodOptional<z.ZodString>;
        in_game: z.ZodBoolean;
        uptime_sec: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"game_start">;
    data: z.ZodObject<{
        theme: z.ZodString;
        total_steps: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"sensor_hit">;
    data: z.ZodObject<{
        sensor: z.ZodNumber;
        correct: z.ZodBoolean;
        step: z.ZodString;
        theme: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    device_id: z.ZodString;
    event: z.ZodLiteral<"game_complete">;
    data: z.ZodObject<{
        theme: z.ZodString;
        duration_sec: z.ZodNumber;
        total_steps: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>], "event">;
export type ESP32Event = z.infer<typeof esp32EventSchema>;
export type StatusEvent = z.infer<typeof statusEventSchema>;
export type GameStartEvent = z.infer<typeof gameStartEventSchema>;
export type SensorHitEvent = z.infer<typeof sensorHitEventSchema>;
export type GameCompleteEvent = z.infer<typeof gameCompleteEventSchema>;
export declare const validateESP32Event: (data: unknown) => {
    valid: boolean;
    data?: ESP32Event;
    errors?: string[];
};
export {};
//# sourceMappingURL=esp32-validation.d.ts.map