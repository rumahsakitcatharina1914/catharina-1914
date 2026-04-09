-- CreateTable
CREATE TABLE `layanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num` VARCHAR(10) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `short` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `features` JSON NOT NULL,
    `schedule` VARCHAR(255) NULL,
    `image` VARCHAR(500) NULL,
    `color` VARCHAR(20) NOT NULL DEFAULT '#0077b6',
    `bg` VARCHAR(20) NOT NULL DEFAULT '#e0f2fe',
    `slug` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `layanan_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(500) NULL,
    `isLarge` BOOLEAN NOT NULL DEFAULT false,
    `isWide` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
