/*
  Warnings:

  - You are about to drop the column `type_invent` on the `info_invents` table. All the data in the column will be lost.
  - Added the required column `invent_type` to the `info_invents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "info_invents" DROP COLUMN "type_invent",
ADD COLUMN     "invent_type" TEXT NOT NULL;
