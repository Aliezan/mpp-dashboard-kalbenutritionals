/*
  Warnings:

  - The primary key for the `MPP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `MPP` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `authorId` to the `MPP` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MPP` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "MPP" DROP CONSTRAINT "MPP_userId_fkey";

-- DropIndex
DROP INDEX "MPP_Employee_ID_key";

-- AlterTable
ALTER TABLE "MPP" DROP CONSTRAINT "MPP_pkey",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "No" DROP DEFAULT,
ADD CONSTRAINT "MPP_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MPP_No_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "MPP" ADD CONSTRAINT "MPP_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
