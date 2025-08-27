/*
  Warnings:

  - You are about to drop the column `value_diferece` on the `invent_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invent_addresses" DROP COLUMN "value_diferece",
ADD COLUMN     "value_diference" DOUBLE PRECISION;
