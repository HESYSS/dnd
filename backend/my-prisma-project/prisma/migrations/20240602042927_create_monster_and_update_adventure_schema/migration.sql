-- CreateTable
CREATE TABLE "Adventure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "customMonsters" JSONB NOT NULL,
    "battlefieldMaps" TEXT[],
    "gmId" INTEGER NOT NULL,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "adventureId" INTEGER NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerAdventures" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerAdventures_AB_unique" ON "_PlayerAdventures"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerAdventures_B_index" ON "_PlayerAdventures"("B");

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_gmId_fkey" FOREIGN KEY ("gmId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_adventureId_fkey" FOREIGN KEY ("adventureId") REFERENCES "Adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerAdventures" ADD CONSTRAINT "_PlayerAdventures_A_fkey" FOREIGN KEY ("A") REFERENCES "Adventure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerAdventures" ADD CONSTRAINT "_PlayerAdventures_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
