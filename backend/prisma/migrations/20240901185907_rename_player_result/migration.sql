/*
  Warnings:

  - You are about to drop the `CourseResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `courseResultId` on the `Score` table. All the data in the column will be lost.
  - Added the required column `playerResultId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CourseResult";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PlayerResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scoreCardId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "PlayerResult_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerResult_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL,
    "playerResultId" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,
    CONSTRAINT "Score_playerResultId_fkey" FOREIGN KEY ("playerResultId") REFERENCES "PlayerResult" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("basketId", "count", "id") SELECT "basketId", "count", "id" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
