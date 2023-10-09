/*
  Warnings:

  - Added the required column `userId` to the `MPP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MPP" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MPP" ADD CONSTRAINT "MPP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
