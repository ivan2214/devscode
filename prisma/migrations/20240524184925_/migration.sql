/*
  Warnings:

  - You are about to drop the column `tagId` on the `Problem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Problem_tagId_idx";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "tagId",
ALTER COLUMN "status" SET DEFAULT 'open',
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET DEFAULT 0,
ALTER COLUMN "views" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "_ProblemToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProblemToTag_AB_unique" ON "_ProblemToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProblemToTag_B_index" ON "_ProblemToTag"("B");
