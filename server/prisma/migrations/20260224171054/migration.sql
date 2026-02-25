/*
  Warnings:

  - Changed the type of `eventType` on the `esp32_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "esp32_events" DROP COLUMN "eventType",
ADD COLUMN     "eventType" "ESP32EventType" NOT NULL;

-- CreateIndex
CREATE INDEX "esp32_events_eventType_idx" ON "esp32_events"("eventType");
