/*
  Warnings:

  - You are about to drop the column `avartar_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avartar_url",
ADD COLUMN     "avatar_url" TEXT,
ALTER COLUMN "facebook_id" DROP NOT NULL,
ALTER COLUMN "google_id" DROP NOT NULL;
