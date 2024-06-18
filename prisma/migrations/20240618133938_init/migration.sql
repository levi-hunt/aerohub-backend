-- CreateTable
CREATE TABLE "organisations" (
    "org_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_email" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "user" (
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
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "org_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "address_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "user_contacts" (
    "contact_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "phone" TEXT,
    "mobile" TEXT,
    "fax" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "user_dates" (
    "date_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "probationary_date" DATE,
    "performance_review_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_dates_pkey" PRIMARY KEY ("date_id")
);

-- CreateTable
CREATE TABLE "user_documents" (
    "document_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "passport_number" TEXT,
    "passport_nationality" TEXT,
    "passport_expiry_date" DATE,
    "drivers_license_number" TEXT,
    "frequent_flyer_number" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_primary_email_key" ON "user"("primary_email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organisations"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_dates" ADD CONSTRAINT "user_dates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
