/*
  Warnings:

  - You are about to drop the column `value_diference` on the `invent_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invent_addresses" DROP COLUMN "value_diference",
ADD COLUMN     "value_difference" DOUBLE PRECISION;
