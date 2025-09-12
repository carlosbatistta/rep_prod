/*
  Warnings:

  - The `code` column on the `licenses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."licenses" DROP COLUMN "code",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "licenses_code_key" ON "public"."licenses"("code");
