/*
  Warnings:

  - The primary key for the `info_invents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `value_difference` on the `invent_addresses` table. All the data in the column will be lost.
  - The primary key for the `number_controls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `code_count` to the `counts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "counts" ADD COLUMN     "code_count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "info_invents" DROP CONSTRAINT "info_invents_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "info_invents_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "info_invents_id_seq";

-- AlterTable
ALTER TABLE "invent_addresses" DROP COLUMN "value_difference";

-- AlterTable
ALTER TABLE "number_controls" DROP CONSTRAINT "number_controls_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "number_controls_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "number_controls_id_seq";

-- CreateTable
CREATE TABLE "count_controls" (
    "id" TEXT NOT NULL,
    "code_count" INTEGER NOT NULL,
    "desc_count" TEXT NOT NULL,

    CONSTRAINT "count_controls_pkey" PRIMARY KEY ("id")
);
