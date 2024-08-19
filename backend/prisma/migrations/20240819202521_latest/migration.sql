/*
  Warnings:

  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "playerId") SELECT "id", "playerId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_playerId_key" ON "User"("playerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
