/*
  Warnings:

  - You are about to drop the `Drink` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "Beverage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "isRecommend" BOOLEAN NOT NULL DEFAULT false
);

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Drink";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "Beverage.name_unique" ON "Beverage"("name");
