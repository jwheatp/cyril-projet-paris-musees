-- CreateTable
CREATE TABLE `Painters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `birthDate` DATE NOT NULL,
    `deathDate` DATE NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `picture_credit` VARCHAR(191) NOT NULL,
    `wikipedia_link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Painting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paintingId` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `painterId` INTEGER NOT NULL,

    UNIQUE INDEX `Painting_paintingId_key`(`paintingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Painting` ADD CONSTRAINT `Painting_painterId_fkey` FOREIGN KEY (`painterId`) REFERENCES `Painters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
