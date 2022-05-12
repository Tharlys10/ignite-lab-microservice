/*
  Warnings:

  - A unique constraint covering the columns `[auth_user_id]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "auth_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_auth_user_id_key" ON "customer"("auth_user_id");
