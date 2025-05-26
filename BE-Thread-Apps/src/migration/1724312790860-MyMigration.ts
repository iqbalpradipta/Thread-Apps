import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1724312790860 implements MigrationInterface {
    name = 'MyMigration1724312790860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "replies" ("id" SERIAL NOT NULL, "image" character varying, "content" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "usersId" integer, "threadsId" integer, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "usersId" integer, "threadsId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "content" character varying, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "usersId" integer, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "following" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "usersFollowingId" integer, "usersFollowerId" integer, CONSTRAINT "PK_c76c6e044bdf76ecf8bfb82a645" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying, "fullName" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo_profile" character varying, "background_profile" character varying, "bio" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_c6ee4d053e8809668481adc6aac" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_4e536cc11421d0601f282b1796f" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_d5312be6de5784293ac29089784" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_5dd48182c6704e9946fd08a8ad9" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_35c345d074803326a814f6035e8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_74ab20406b1fbdf129b121a0607" FOREIGN KEY ("usersFollowingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_5d061c27bcaad54e99411c0f65c" FOREIGN KEY ("usersFollowerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_5d061c27bcaad54e99411c0f65c"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_74ab20406b1fbdf129b121a0607"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_35c345d074803326a814f6035e8"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_5dd48182c6704e9946fd08a8ad9"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_d5312be6de5784293ac29089784"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_4e536cc11421d0601f282b1796f"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_c6ee4d053e8809668481adc6aac"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "replies"`);
    }

}
