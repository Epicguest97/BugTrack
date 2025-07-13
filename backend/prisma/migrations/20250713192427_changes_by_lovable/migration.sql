-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('TASK', 'BUG', 'FEATURE', 'STORY', 'EPIC');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignee" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "epic" TEXT,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "reporter" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "storyPoints" INTEGER,
ADD COLUMN     "type" "IssueType" NOT NULL DEFAULT 'TASK';
