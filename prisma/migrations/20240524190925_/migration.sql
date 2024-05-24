/*
  Warnings:

  - You are about to drop the column `userId` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `userIdReply` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reply_userId_idx";

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "userId",
ADD COLUMN     "userIdReply" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Reply_userIdReply_idx" ON "Reply"("userIdReply");
