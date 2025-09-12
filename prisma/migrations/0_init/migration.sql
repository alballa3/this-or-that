-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."WouldYouRatherMain" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WouldYouRatherMain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WouldYouRatherQuestion" (
    "id" TEXT NOT NULL,
    "optionOne" TEXT NOT NULL,
    "optionTwo" TEXT NOT NULL,
    "wouldYouRatherMainId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WouldYouRatherQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WouldYouRatherQuestion" ADD CONSTRAINT "WouldYouRatherQuestion_wouldYouRatherMainId_fkey" FOREIGN KEY ("wouldYouRatherMainId") REFERENCES "public"."WouldYouRatherMain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

