/*
  Warnings:

  - Added the required column `data` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "concluida" SET DEFAULT false;
