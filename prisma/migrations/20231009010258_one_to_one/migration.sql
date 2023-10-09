/*
  Warnings:

  - You are about to drop the column `authorId` on the `MPP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `MPP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `MPP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MPP" DROP CONSTRAINT "MPP_authorId_fkey";

-- AlterTable
ALTER TABLE "MPP" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MPP_userId_key" ON "MPP"("userId");

-- AddForeignKey
ALTER TABLE "MPP" ADD CONSTRAINT "MPP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
