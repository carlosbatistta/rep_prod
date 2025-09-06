/*
  Warnings:

  - You are about to drop the column `codigo` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Code]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."profiles_codigo_key";

-- DropIndex
DROP INDEX "public"."users_codigo_key";

-- AlterTable
ALTER TABLE "public"."profiles" DROP COLUMN "codigo",
ADD COLUMN     "Code" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "codigo",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "public"."accesses" (
    "id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "access_nivel" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "accesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."client" (
    "id" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "name_fantasy" TEXT NOT NULL,
    "name_company" TEXT NOT NULL,
    "ie" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "city" BOOLEAN NOT NULL,
    "cep" INTEGER NOT NULL,
    "ruad" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service" (
    "id" TEXT NOT NULL,
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."license" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_cnpj_key" ON "public"."client"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "service_code_key" ON "public"."service"("code");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_Code_key" ON "public"."profiles"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "public"."users"("code");

-- AddForeignKey
ALTER TABLE "public"."accesses" ADD CONSTRAINT "accesses_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."license" ADD CONSTRAINT "license_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."license" ADD CONSTRAINT "license_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
