-- CreateTable
CREATE TABLE "MPP" (
    "No" SERIAL NOT NULL,
    "Employee_ID" INTEGER NOT NULL,
    "Employee_Name" TEXT NOT NULL,
    "Join_Date" DATE NOT NULL,
    "Job_Title_Name" TEXT NOT NULL,
    "Org_Group_Name" TEXT NOT NULL,
    "Job_Level_Code" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "MPP" INTEGER NOT NULL,
    "Actual" INTEGER NOT NULL,
    "Gap" INTEGER NOT NULL,

    CONSTRAINT "MPP_pkey" PRIMARY KEY ("No")
);

-- CreateIndex
CREATE UNIQUE INDEX "MPP_Employee_ID_key" ON "MPP"("Employee_ID");
