/*
  Warnings:

  - You are about to drop the column `product_code` on the `invent_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `product_desc` on the `invent_addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invent_addresses" DROP COLUMN "product_code",
DROP COLUMN "product_desc";

-- AlterTable
ALTER TABLE "invent_products" ADD COLUMN     "address_code" TEXT;
