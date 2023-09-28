-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Org_name_key" ON "Org"("name");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgName_fkey" FOREIGN KEY ("orgName") REFERENCES "Org"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
