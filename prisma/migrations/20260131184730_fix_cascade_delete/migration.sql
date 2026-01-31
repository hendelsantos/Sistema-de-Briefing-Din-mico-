-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_submissionId_fkey";

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
