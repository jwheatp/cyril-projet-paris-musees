/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Painters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Painters_name_key` ON `Painters`(`name`);
