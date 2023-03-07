/*
  Warnings:

  - You are about to drop the `painting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `painting` DROP FOREIGN KEY `Painting_painterId_fkey`;

-- DropTable
DROP TABLE `painting`;

-- CreateTable
CREATE TABLE `Paintings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paintingId` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `painterId` INTEGER NOT NULL,

    UNIQUE INDEX `Paintings_paintingId_key`(`paintingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paintings` ADD CONSTRAINT `Paintings_painterId_fkey` FOREIGN KEY (`painterId`) REFERENCES `Painters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
