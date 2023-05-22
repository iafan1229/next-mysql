/*
  Warnings:

  - You are about to drop the column `age` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pw` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `age`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `pw` VARCHAR(200) NOT NULL;

-- DropTable
DROP TABLE `post`;
