-- CreateTable
CREATE TABLE "TicketResponse" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "url" TEXT,
    "urlLabel" TEXT,
    "ticketId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authorName" TEXT,
    "authorEmail" TEXT,
    "isAdminResponse" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketResponse" ADD CONSTRAINT "TicketResponse_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketResponse" ADD CONSTRAINT "TicketResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
