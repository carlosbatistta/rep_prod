/*
  Warnings:

  - Added the required column `company` to the `branches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branches" ADD COLUMN     "company" TEXT NOT NULL;
