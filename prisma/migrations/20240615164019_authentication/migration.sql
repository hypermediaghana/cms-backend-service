-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "other_name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "partner" BOOLEAN DEFAULT false,
    "role" "Roles" NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
