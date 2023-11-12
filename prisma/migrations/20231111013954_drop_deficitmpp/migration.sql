/*
  Warnings:

  - You are about to drop the `DeficitMPP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeficitMPP" DROP CONSTRAINT "DeficitMPP_userId_fkey";

-- DropTable
DROP TABLE "DeficitMPP";
