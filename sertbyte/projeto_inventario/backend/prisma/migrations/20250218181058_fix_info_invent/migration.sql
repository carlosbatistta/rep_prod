/*
  Warnings:

  - Added the required column `offline` to the `info_invents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restriction` to the `info_invents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_invent` to the `info_invents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departament` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feature` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subgroup` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "info_invents" ADD COLUMN     "offline" BOOLEAN NOT NULL,
ADD COLUMN     "restriction" BOOLEAN NOT NULL,
ADD COLUMN     "type_invent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "departament" TEXT NOT NULL,
ADD COLUMN     "feature" TEXT NOT NULL,
ADD COLUMN     "group" TEXT NOT NULL,
ADD COLUMN     "line" TEXT NOT NULL,
ADD COLUMN     "subgroup" TEXT NOT NULL;
