/*
  Warnings:

  - You are about to drop the `userDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userDetails" DROP CONSTRAINT "userDetails_userId_fkey";

-- DropTable
DROP TABLE "userDetails";

-- CreateTable
CREATE TABLE "user_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
