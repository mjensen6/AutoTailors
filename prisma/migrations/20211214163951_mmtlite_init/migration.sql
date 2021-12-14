-- CreateTable
CREATE TABLE "MMTLite" (
    "id_trim" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "year_from" TEXT NOT NULL,
    "yearTo" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "trim" TEXT NOT NULL,
    "body_type" TEXT NOT NULL
);
