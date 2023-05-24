/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` TIMESTAMP NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Subs` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `imageUrn` VARCHAR(200) NULL,
    `bannerUrn` VARCHAR(200) NULL,
    `userName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `identifier` VARCHAR(200) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `body` MEDIUMTEXT NULL,
    `subName` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subs` ADD CONSTRAINT `Subs_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_subName_fkey` FOREIGN KEY (`subName`) REFERENCES `Subs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
