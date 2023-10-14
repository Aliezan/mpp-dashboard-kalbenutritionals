/*
  Warnings:

  - Made the column `Job_Level_Code` on table `DeficitMPP` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DeficitMPP" ALTER COLUMN "Job_Level_Code" SET NOT NULL;
