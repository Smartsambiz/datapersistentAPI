/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sample_size` on the `Profile` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `country_id` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - Added the required column `country_name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "sample_size";

-- Step 2: Add the new column with a default
ALTER TABLE "Profile" ADD COLUMN "country_name" TEXT NOT NULL DEFAULT 'Unknown';
