/*
  Warnings:

  - Made the column `Employee_ID` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Employee_Name` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Join_Date` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Job_Title_Name` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Org_Group_Name` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Job_Level_Code` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Category` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Status` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `MPP` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Actual` on table `MPP` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Gap` on table `MPP` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MPP" ALTER COLUMN "Employee_ID" SET NOT NULL,
ALTER COLUMN "Employee_Name" SET NOT NULL,
ALTER COLUMN "Join_Date" SET NOT NULL,
ALTER COLUMN "Job_Title_Name" SET NOT NULL,
ALTER COLUMN "Org_Group_Name" SET NOT NULL,
ALTER COLUMN "Job_Level_Code" SET NOT NULL,
ALTER COLUMN "Category" SET NOT NULL,
ALTER COLUMN "Status" SET NOT NULL,
ALTER COLUMN "MPP" SET NOT NULL,
ALTER COLUMN "MPP" SET DEFAULT 1,
ALTER COLUMN "Actual" SET NOT NULL,
ALTER COLUMN "Actual" SET DEFAULT 1,
ALTER COLUMN "Gap" SET NOT NULL,
ALTER COLUMN "Gap" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Org_Group_Name" TEXT;

-- CreateTable
CREATE TABLE "DeficitMPP" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "Org_Group_Name" TEXT NOT NULL,
    "Job_Title_Name" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "MPP" INTEGER NOT NULL DEFAULT 1,
    "Actual" INTEGER NOT NULL DEFAULT 0,
    "Gap" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "DeficitMPP_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeficitMPP" ADD CONSTRAINT "DeficitMPP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
