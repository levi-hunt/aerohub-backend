-- CreateEnum
CREATE TYPE "roles" AS ENUM ('USER', 'INVESTIGATOR', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "action_status" AS ENUM ('URGENT_ACTION', 'FURTHER_ACTION', 'AWAITING_CORRECTIVE_ACTION', 'REVIEWING_CORRECTIVE_ACTION', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "action_type" AS ENUM ('REQUEST_FOR_CORRECTIVE_ACTION', 'SUGGESTED_IMPROVEMENT', 'COMPAINT');

-- CreateEnum
CREATE TYPE "event_likelihood" AS ENUM ('RARE', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'ALMOST_CERTAIN');

-- CreateEnum
CREATE TYPE "event_consequences" AS ENUM ('INSIGNIFICANT', 'MINOR', 'MODERATE', 'MAJOR', 'CATASTROPHIC');

-- CreateTable
CREATE TABLE "organisations" (
    "org_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_email" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "address_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "user_contacts" (
    "contact_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "phone" TEXT,
    "mobile" TEXT,
    "fax" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "user_dates" (
    "date_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "probationary_date" DATE,
    "performance_review_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_dates_pkey" PRIMARY KEY ("date_id")
);

-- CreateTable
CREATE TABLE "user_documents" (
    "document_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "passport_number" TEXT,
    "passport_nationality" TEXT,
    "passport_expiry_date" DATE,
    "drivers_license_number" TEXT,
    "frequent_flyer_number" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "position" TEXT,
    "primary_email" TEXT NOT NULL,
    "secondary_email" TEXT,
    "description" TEXT,
    "dob" DATE,
    "asic" TEXT,
    "last_login" TIMESTAMP(6),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "org_id" INTEGER NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "action_register" (
    "action_id" SERIAL NOT NULL,
    "created_by" INTEGER NOT NULL,
    "action_from" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3),
    "status" "action_status" NOT NULL DEFAULT 'AWAITING_CORRECTIVE_ACTION',
    "cause_category_id" INTEGER NOT NULL,
    "root_cause" TEXT,
    "preventative_action" TEXT,
    "corrective_action" TEXT,
    "action_required" TEXT NOT NULL,
    "event_likelihood" "event_likelihood" NOT NULL,
    "event_consequence" "event_consequences" NOT NULL,

    CONSTRAINT "action_register_pkey" PRIMARY KEY ("action_id")
);

-- CreateTable
CREATE TABLE "cause_categories" (
    "cat_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "cause_categories_pkey" PRIMARY KEY ("cat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_primary_email_key" ON "users"("primary_email");

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_dates" ADD CONSTRAINT "user_dates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organisations"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "action_register" ADD CONSTRAINT "action_register_cause_category_id_fkey" FOREIGN KEY ("cause_category_id") REFERENCES "cause_categories"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "action_register" ADD CONSTRAINT "action_register_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cause_categories" ADD CONSTRAINT "cause_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "cause_categories"("cat_id") ON DELETE SET NULL ON UPDATE CASCADE;
