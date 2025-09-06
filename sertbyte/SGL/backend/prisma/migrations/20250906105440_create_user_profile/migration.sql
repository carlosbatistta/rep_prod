-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_codigo_key" ON "public"."users"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_codigo_key" ON "public"."profiles"("codigo");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
