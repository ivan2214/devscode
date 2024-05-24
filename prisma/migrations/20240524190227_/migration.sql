-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "problemId" TEXT;

-- CreateTable
CREATE TABLE "CommentsReplies" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commentId" TEXT NOT NULL,
    "userReplyId" TEXT NOT NULL,

    CONSTRAINT "CommentsReplies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommentsReplies_commentId_idx" ON "CommentsReplies"("commentId");

-- CreateIndex
CREATE INDEX "CommentsReplies_userReplyId_idx" ON "CommentsReplies"("userReplyId");

-- CreateIndex
CREATE INDEX "Comment_problemId_idx" ON "Comment"("problemId");
