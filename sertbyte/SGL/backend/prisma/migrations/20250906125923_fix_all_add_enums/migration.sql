/*
  Warnings:

  - You are about to drop the column `access_nivel` on the `accesses` table. All the data in the column will be lost.
  - You are about to drop the column `Code` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `license` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_level` to the `accesses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."LicenseStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."LicenseType" AS ENUM ('OUR_SYSTEM', 'CLIENT_ERP');

-- CreateEnum
CREATE TYPE "public"."ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "public"."license" DROP CONSTRAINT "license_client_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."license" DROP CONSTRAINT "license_service_id_fkey";

-- DropIndex
DROP INDEX "public"."profiles_Code_key";

-- AlterTable
ALTER TABLE "public"."accesses" DROP COLUMN "access_nivel",
ADD COLUMN     "access_level" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."profiles" DROP COLUMN "Code",
ADD COLUMN     "code" SERIAL NOT NULL;

-- DropTable
DROP TABLE "public"."client";

-- DropTable
DROP TABLE "public"."license";

-- DropTable
DROP TABLE "public"."service";

-- CreateTable
CREATE TABLE "public"."clients" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "name_fantasy" TEXT NOT NULL,
    "name_company" TEXT NOT NULL,
    "ie" TEXT,
    "status" "public"."ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "id" TEXT NOT NULL,
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."licenses" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" "public"."LicenseStatus" NOT NULL DEFAULT 'ACTIVE',
    "type" "public"."LicenseType" NOT NULL DEFAULT 'OUR_SYSTEM',
    "db_connection_string" TEXT,
    "db_user" TEXT,
    "db_password" TEXT,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_cnpj_key" ON "public"."clients"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "services_code_key" ON "public"."services"("code");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "public"."services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_key_key" ON "public"."licenses"("key");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_code_key" ON "public"."profiles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_name_key" ON "public"."profiles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."licenses" ADD CONSTRAINT "licenses_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."licenses" ADD CONSTRAINT "licenses_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
