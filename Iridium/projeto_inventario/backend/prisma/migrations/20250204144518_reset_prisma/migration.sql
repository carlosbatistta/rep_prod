-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesses" (
    "id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "access_nivel" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "accesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "address" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storages" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "storages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "storage_code" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtual_locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "virtual_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "codBar" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "total_quantity" INTEGER NOT NULL,
    "addresed_quantity" INTEGER,
    "product_code" TEXT NOT NULL,
    "product_desc" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "storage_code" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "reservation" INTEGER NOT NULL,
    "unbalanced" BOOLEAN,
    "address_control" TEXT NOT NULL,
    "localiz_control" TEXT NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_stocks" (
    "id" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "document" INTEGER,
    "date_count" TEXT NOT NULL,
    "total_stock_value" DOUBLE PRECISION,
    "total_stock_quantity" INTEGER,

    CONSTRAINT "info_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addressed_stocks" (
    "id" TEXT NOT NULL,
    "addressed_quantity" INTEGER NOT NULL,
    "product_code" TEXT NOT NULL,
    "product_desc" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "address_code" TEXT NOT NULL,
    "reserve_quantity" INTEGER NOT NULL,
    "transfer_quantity" INTEGER NOT NULL,

    CONSTRAINT "addressed_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counts" (
    "id" TEXT NOT NULL,
    "count_quantity" INTEGER NOT NULL,
    "date_count" TEXT NOT NULL,
    "document" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "address_code" TEXT,
    "user_name" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "product_desc" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,

    CONSTRAINT "counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invent_addresses" (
    "id" TEXT NOT NULL,
    "document" INTEGER NOT NULL,
    "date_count" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "address_code" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "product_desc" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "difference_quantity" INTEGER,
    "original_quantity" INTEGER,
    "count_quantity" INTEGER,
    "value_diferece" DOUBLE PRECISION,

    CONSTRAINT "invent_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invent_products" (
    "id" TEXT NOT NULL,
    "document" INTEGER NOT NULL,
    "date_count" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "product_desc" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "difference_quantity" INTEGER,
    "original_quantity" INTEGER,
    "count_quantity" INTEGER,
    "value_diferece" DOUBLE PRECISION,

    CONSTRAINT "invent_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_invents" (
    "id" SERIAL NOT NULL,
    "document" INTEGER NOT NULL,
    "date_count" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "date_valid" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "tp_material" TEXT NOT NULL,
    "accuracy_quanty" DOUBLE PRECISION,
    "accuracy_value" DOUBLE PRECISION,
    "accuracy_percent" DOUBLE PRECISION,
    "accuracy_total" DOUBLE PRECISION,
    "total_stock_value" DOUBLE PRECISION,
    "total_inventory_value" DOUBLE PRECISION,
    "total_stock_quanty" INTEGER,
    "total_inventory_quanty" INTEGER,
    "difference_quanty" INTEGER,
    "diference_value" DOUBLE PRECISION,

    CONSTRAINT "info_invents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "number_controls" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "storage_code" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,

    CONSTRAINT "number_controls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accesses" ADD CONSTRAINT "accesses_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
