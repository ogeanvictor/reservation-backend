-- CreateEnum
CREATE TYPE "DeskStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'DISABLED');

-- CreateTable
CREATE TABLE "Desk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "DeskStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Desk_pkey" PRIMARY KEY ("id")
);
