/*
  Warnings:

  - You are about to drop the column `db_connection_string` on the `licenses` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `licenses` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `licenses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `licenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."licenses_key_key";

-- AlterTable
ALTER TABLE "public"."licenses" DROP COLUMN "db_connection_string",
DROP COLUMN "key",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "db_connection" TEXT;

-- AlterTable
ALTER TABLE "public"."profiles" DROP COLUMN "nivel",
ADD COLUMN     "level" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "licenses_code_key" ON "public"."licenses"("code");
