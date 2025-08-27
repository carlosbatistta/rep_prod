/*
  Warnings:

  - Added the required column `counted` to the `invent_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invent_products" ADD COLUMN     "counted" BOOLEAN NOT NULL;
