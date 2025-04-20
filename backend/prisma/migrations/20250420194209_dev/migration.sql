-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScoreCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ScoreCard_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScoreCard" ("courseId", "endDate", "id", "startDate") SELECT "courseId", "endDate", "id", "startDate" FROM "ScoreCard";
DROP TABLE "ScoreCard";
ALTER TABLE "new_ScoreCard" RENAME TO "ScoreCard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
