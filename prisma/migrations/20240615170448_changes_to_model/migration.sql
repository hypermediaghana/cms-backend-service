/*
  Warnings:

  - You are about to drop the column `partner` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "partner",
ADD COLUMN     "profile_image" TEXT;
