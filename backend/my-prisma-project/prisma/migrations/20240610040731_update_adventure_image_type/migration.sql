/*
  Warnings:

  - The `battlefieldMaps` column on the `Adventure` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `image` on the `Adventure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Adventure" DROP COLUMN "image",
ADD COLUMN     "image" BYTEA NOT NULL,
DROP COLUMN "battlefieldMaps",
ADD COLUMN     "battlefieldMaps" BYTEA[];
