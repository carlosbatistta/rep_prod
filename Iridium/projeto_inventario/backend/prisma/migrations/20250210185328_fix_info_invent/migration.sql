/*
  Warnings:

  - Added the required column `status` to the `info_invents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "info_invents" ADD COLUMN     "status" TEXT NOT NULL;
