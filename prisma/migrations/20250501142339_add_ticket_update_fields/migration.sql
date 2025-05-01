-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "closedBy" TEXT,
ADD COLUMN     "lastUpdateNote" TEXT;
