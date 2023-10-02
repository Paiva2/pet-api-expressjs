-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_orgName_fkey";

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgName_fkey" FOREIGN KEY ("orgName") REFERENCES "Org"("name") ON DELETE CASCADE ON UPDATE CASCADE;
