-- CreateTable
CREATE TABLE "ScoreCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ScoreCard_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "layout" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "par" INTEGER NOT NULL,
    "length" REAL NOT NULL,
    "order" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Basket_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL,
    "courseResultId" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,
    CONSTRAINT "Score_courseResultId_fkey" FOREIGN KEY ("courseResultId") REFERENCES "CourseResult" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scoreCardId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "CourseResult_scoreCardId_fkey" FOREIGN KEY ("scoreCardId") REFERENCES "ScoreCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseResult_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
