/*
  Warnings:

  - You are about to alter the column `createdAt` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `subs` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Made the column `imageUrn` on table `subs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `createdAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `subs` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `imageUrn` VARCHAR(191) NOT NULL DEFAULT 'https://www.gravatar.com/avatar?d=mp&f=y';

-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` TIMESTAMP NULL;
