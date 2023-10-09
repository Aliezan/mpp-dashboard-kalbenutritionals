-- AlterTable
CREATE SEQUENCE mpp_no_seq;
ALTER TABLE "MPP" ALTER COLUMN "No" SET DEFAULT nextval('mpp_no_seq');
ALTER SEQUENCE mpp_no_seq OWNED BY "MPP"."No";
