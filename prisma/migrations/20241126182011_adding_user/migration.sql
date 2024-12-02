-- TODO reset db and do 2 steps migration


-- AlterTable
ALTER TABLE "Post"
ADD COLUMN "userId" INTEGER;

UPDATE "Post"
SET "userId" = 1;

ALTER TABLE "Post"
ALTER COLUMN "userId" SET NOT NULL;


-- CreateTable
CREATE TABLE "User"
(
    "id"    SERIAL NOT NULL,
    "email" TEXT   NOT NULL,
    "name"  TEXT   NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

INSERT INTO "User" (email, name)
values ('yoyo@straumann.com', 'yoyo');

-- AddForeignKey
ALTER TABLE "Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
