-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "passvorld" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
