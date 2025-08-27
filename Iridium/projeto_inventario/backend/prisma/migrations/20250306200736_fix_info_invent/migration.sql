/*
  Warnings:

  - You are about to drop the column `restriction` on the `info_invents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "info_invents" DROP COLUMN "restriction",
ADD COLUMN     "is_reserved_b2" BOOLEAN,
ADD COLUMN     "is_reserved_wms" BOOLEAN,
ADD COLUMN     "is_transfer" BOOLEAN,
ADD COLUMN     "is_unbalanced" BOOLEAN,
ADD COLUMN     "is_wms_control" BOOLEAN,
ADD COLUMN     "is_zero_cost" BOOLEAN,
ADD COLUMN     "order_quantity" INTEGER;
