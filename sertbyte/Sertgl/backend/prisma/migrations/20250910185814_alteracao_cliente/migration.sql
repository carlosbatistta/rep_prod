/*
  Warnings:

  - The `ie` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cod_city` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cep` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."clients" ADD COLUMN     "cod_city" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
DROP COLUMN "ie",
ADD COLUMN     "ie" INTEGER,
DROP COLUMN "cep",
ADD COLUMN     "cep" INTEGER NOT NULL;
