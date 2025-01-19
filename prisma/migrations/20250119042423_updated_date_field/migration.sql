-- CreateTable
CREATE TABLE "userDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "userDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userDetails" ADD CONSTRAINT "userDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
