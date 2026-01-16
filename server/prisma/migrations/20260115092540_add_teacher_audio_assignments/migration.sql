-- CreateTable
CREATE TABLE "teacher_audio_assignments" (
    "id" UUID NOT NULL,
    "teacherId" UUID NOT NULL,
    "audioId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_audio_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacher_audio_assignments_teacherId_audioId_studentId_key" ON "teacher_audio_assignments"("teacherId", "audioId", "studentId");

-- AddForeignKey
ALTER TABLE "teacher_audio_assignments" ADD CONSTRAINT "teacher_audio_assignments_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_audio_assignments" ADD CONSTRAINT "teacher_audio_assignments_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "audio_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_audio_assignments" ADD CONSTRAINT "teacher_audio_assignments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
