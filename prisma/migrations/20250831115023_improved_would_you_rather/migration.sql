/*
  Warnings:

  - Added the required column `wouldYouRatherMainId` to the `WouldYouRatherQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WouldYouRatherMain" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WouldYouRatherQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "optionOne" TEXT NOT NULL,
    "optionTwo" TEXT NOT NULL,
    "wouldYouRatherMainId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WouldYouRatherQuestion_wouldYouRatherMainId_fkey" FOREIGN KEY ("wouldYouRatherMainId") REFERENCES "WouldYouRatherMain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WouldYouRatherQuestion" ("createdAt", "id", "optionOne", "optionTwo", "updatedAt") SELECT "createdAt", "id", "optionOne", "optionTwo", "updatedAt" FROM "WouldYouRatherQuestion";
DROP TABLE "WouldYouRatherQuestion";
ALTER TABLE "new_WouldYouRatherQuestion" RENAME TO "WouldYouRatherQuestion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
