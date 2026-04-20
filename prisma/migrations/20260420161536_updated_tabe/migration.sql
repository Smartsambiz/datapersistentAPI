/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `country_id` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.

*/
-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "country_id" SET DATA TYPE VARCHAR(2),
ALTER COLUMN "country_name" DROP DEFAULT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
