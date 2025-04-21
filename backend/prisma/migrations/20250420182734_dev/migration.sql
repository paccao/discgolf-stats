/*
  Warnings:

  - You are about to drop the column `date` on the `ScoreCard` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `ScoreCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ScoreCard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScoreCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ScoreCard_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScoreCard" ("courseId", "id") SELECT "courseId", "id" FROM "ScoreCard";
DROP TABLE "ScoreCard";
ALTER TABLE "new_ScoreCard" RENAME TO "ScoreCard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
