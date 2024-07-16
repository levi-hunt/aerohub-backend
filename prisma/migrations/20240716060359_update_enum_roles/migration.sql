/*
  Warnings:

  - The values [USER,INVESTIGATOR,SUPERADMIN] on the enum `roles` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `cause_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cat_id` on the `cause_categories` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "roles_new" AS ENUM ('BASE', 'ADMINISTRATION', 'CORPORATE', 'CREWMEN', 'ENGINEER', 'GROUND_CREW', 'HSEQ', 'OPERATIONS', 'PILOT');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "roles_new" USING ("role"::text::"roles_new");
ALTER TYPE "roles" RENAME TO "roles_old";
ALTER TYPE "roles_new" RENAME TO "roles";
DROP TYPE "roles_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'BASE';
COMMIT;

-- DropForeignKey
ALTER TABLE "action_register" DROP CONSTRAINT "action_register_cause_category_id_fkey";

-- DropForeignKey
ALTER TABLE "cause_categories" DROP CONSTRAINT "cause_categories_parent_id_fkey";

-- AlterTable
ALTER TABLE "cause_categories" DROP CONSTRAINT "cause_categories_pkey",
DROP COLUMN "cat_id",
ADD COLUMN     "cause_cat_id" SERIAL NOT NULL,
ADD CONSTRAINT "cause_categories_pkey" PRIMARY KEY ("cause_cat_id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'BASE';

-- CreateTable
CREATE TABLE "hazards" (
    "hazard_id" SERIAL NOT NULL,
    "hazard" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "signoffs_required" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "hazard_cat_id" INTEGER NOT NULL,

    CONSTRAINT "hazards_pkey" PRIMARY KEY ("hazard_id")
);

-- CreateTable
CREATE TABLE "hazard_signoffs" (
    "id" SERIAL NOT NULL,
    "hazard_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "signed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hazard_signoffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hazard_categories" (
    "hazard_cat_id" SERIAL NOT NULL,

    CONSTRAINT "hazard_categories_pkey" PRIMARY KEY ("hazard_cat_id")
);

-- CreateTable
CREATE TABLE "risks" (
    "risk_id" SERIAL NOT NULL,
    "risk_name" TEXT NOT NULL,
    "description" TEXT,
    "risk_matrix_type" TEXT NOT NULL,
    "likelihood" "event_likelihood" NOT NULL,
    "consequence" "event_consequences" NOT NULL,
    "risk_index" TEXT,
    "adequacy_of_existing_controls" TEXT NOT NULL,
    "risk_priority" TEXT NOT NULL,
    "risk_owner" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("risk_id")
);

-- CreateTable
CREATE TABLE "risk_equipment" (
    "id" SERIAL NOT NULL,
    "risk_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,

    CONSTRAINT "risk_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "equipment_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("equipment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hazard_signoffs_hazard_id_user_id_key" ON "hazard_signoffs"("hazard_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "risk_equipment_risk_id_equipment_id_key" ON "risk_equipment"("risk_id", "equipment_id");

-- AddForeignKey
ALTER TABLE "action_register" ADD CONSTRAINT "action_register_cause_category_id_fkey" FOREIGN KEY ("cause_category_id") REFERENCES "cause_categories"("cause_cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cause_categories" ADD CONSTRAINT "cause_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "cause_categories"("cause_cat_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hazards" ADD CONSTRAINT "hazards_hazard_cat_id_fkey" FOREIGN KEY ("hazard_cat_id") REFERENCES "hazard_categories"("hazard_cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hazard_signoffs" ADD CONSTRAINT "hazard_signoffs_hazard_id_fkey" FOREIGN KEY ("hazard_id") REFERENCES "hazards"("hazard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hazard_signoffs" ADD CONSTRAINT "hazard_signoffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_risk_owner_fkey" FOREIGN KEY ("risk_owner") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_equipment" ADD CONSTRAINT "risk_equipment_risk_id_fkey" FOREIGN KEY ("risk_id") REFERENCES "risks"("risk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_equipment" ADD CONSTRAINT "risk_equipment_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("equipment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
