/*
  Warnings:

  - You are about to drop the column `customerId` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `purchase` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_customerId_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_productId_fkey";

-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
