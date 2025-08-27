/*
  Warnings:

  - Added the required column `access_nivel` to the `addressed_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `counts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `info_invents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `info_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `invent_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `invent_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `number_controls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_nivel` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addressed_stocks" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "counts" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "info_invents" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "info_stocks" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "invent_addresses" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "invent_products" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "number_controls" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "access_nivel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "access_nivel" INTEGER NOT NULL;
