-- CreateTable
CREATE TABLE "MarketCar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marketPrice" INTEGER NOT NULL,
    "wholesalePrice" INTEGER NOT NULL,
    "offerPrice" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "_MarketCarToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "MarketCar" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MarketCarToUser_AB_unique" ON "_MarketCarToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MarketCarToUser_B_index" ON "_MarketCarToUser"("B");
