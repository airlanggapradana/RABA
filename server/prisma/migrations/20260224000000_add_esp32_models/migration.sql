-- CreateEnum
CREATE TYPE "ESP32EventType" AS ENUM ('status', 'game_start', 'sensor_hit', 'game_complete');

-- CreateTable
CREATE TABLE "esp32_devices" (
    "id" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "theme" TEXT,
    "wifiRssi" INTEGER,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastSeen" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptimeSec" INTEGER,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "esp32_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esp32_events" (
    "id" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "esp32_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_sessions" (
    "id" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "totalSteps" INTEGER NOT NULL,
    "completedSteps" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMPTZ,
    "durationSec" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor_hits" (
    "id" UUID NOT NULL,
    "gameSessionId" UUID NOT NULL,
    "sensorNumber" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "step" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_hits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "esp32_devices_deviceId_key" ON "esp32_devices"("deviceId");

-- CreateIndex
CREATE INDEX "esp32_events_deviceId_idx" ON "esp32_events"("deviceId");

-- CreateIndex
CREATE INDEX "esp32_events_eventType_idx" ON "esp32_events"("eventType");

-- CreateIndex
CREATE INDEX "esp32_events_createdAt_idx" ON "esp32_events"("createdAt");

-- CreateIndex
CREATE INDEX "game_sessions_deviceId_idx" ON "game_sessions"("deviceId");

-- CreateIndex
CREATE INDEX "game_sessions_startedAt_idx" ON "game_sessions"("startedAt");

-- CreateIndex
CREATE INDEX "sensor_hits_gameSessionId_idx" ON "sensor_hits"("gameSessionId");

-- AddForeignKey
ALTER TABLE "esp32_events" ADD CONSTRAINT "esp32_events_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "esp32_devices"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "esp32_devices"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_hits" ADD CONSTRAINT "sensor_hits_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "game_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
