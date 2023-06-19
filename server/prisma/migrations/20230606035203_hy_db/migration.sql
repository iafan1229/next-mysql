/*
  Warnings:

  - You are about to alter the column `createdAt` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `subs` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `userId` to the `Subs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subs` DROP FOREIGN KEY `Subs_userName_fkey`;

-- AlterTable
ALTER TABLE `post` MODIFY `createdAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `subs` ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `userName` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `Subs` ADD CONSTRAINT `Subs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
