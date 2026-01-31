-- CreateTable
CREATE TABLE "proposals" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "price" DECIMAL(65,30),
    "deadline" TEXT,
    "scope" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "proposals_submissionId_key" ON "proposals"("submissionId");

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
