-- CreateTable
CREATE TABLE "WouldYouRatherQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "optionOne" TEXT NOT NULL,
    "optionTwo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
