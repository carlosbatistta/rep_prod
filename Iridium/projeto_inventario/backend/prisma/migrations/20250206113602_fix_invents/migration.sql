/*
  Warnings:

  - You are about to drop the column `document` on the `counts` table. All the data in the column will be lost.
  - Added the required column `situation` to the `invent_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situation` to the `invent_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "counts" DROP COLUMN "document";

-- AlterTable
ALTER TABLE "invent_addresses" ADD COLUMN     "situation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invent_products" ADD COLUMN     "situation" TEXT NOT NULL;
