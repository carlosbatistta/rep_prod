/*
  Warnings:

  - Added the required column `branch_code` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "branch_code" TEXT NOT NULL;
