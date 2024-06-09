/*
Warnings:

- You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
- A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
- Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.

 */
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User"
DROP COLUMN "email",
ADD COLUMN "login" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User" ("login");

INSERT INTO
  "User" (login, password)
VALUES
  (
    'admin',
    '5cceebdcfcb2c183fae78daf7c0b632946c7ad9fa3d5db7888eba77a488f9bcea87cb72c9fce2fe54e55102ab085fc14cf694ed61b40cad345695a6d7740be6b:2b2e608d67e9d7ef3158965e67e65db43f176ea28ebce107d7b55d53bb08cbd49ca97f66c8063e656ad769738f715710fb65d842204fb8ebca70cd6fe6f05878'
  );