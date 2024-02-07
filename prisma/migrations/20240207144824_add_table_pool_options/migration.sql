-- CreateTable
CREATE TABLE "pool_options" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "pool_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pool_options" ADD CONSTRAINT "pool_options_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "pools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
