import { MigrationInterface, QueryRunner } from 'typeorm'
import { hashSync } from 'bcrypt'

export class initialCommit1656001971526 implements MigrationInterface {
  name = 'initialCommit1656001971526'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("stock_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, "dvdDvdId" uuid, CONSTRAINT "REL_ce6e842aa1de546a30f9ecad07" UNIQUE ("dvdDvdId"), CONSTRAINT "PK_535f28fb720127de0997a5a866e" PRIMARY KEY ("stock_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "dvd" ("dvd_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_7eadc7c195eb2930d122b0fb3c6" PRIMARY KEY ("dvd_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "carts" ("cart_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "userUserId" uuid, CONSTRAINT "REL_b50e2403bed7d7f56a098ef7df" UNIQUE ("userUserId"), CONSTRAINT "PK_2fb47cbe0c6f182bb31c66689e9" PRIMARY KEY ("cart_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "carts_dvds_dvd" ("cartsCartId" uuid NOT NULL, "dvdDvdId" uuid NOT NULL, CONSTRAINT "PK_5a6bb8ce6bdb2bc79fdaa3f76bc" PRIMARY KEY ("cartsCartId", "dvdDvdId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_01c50d0167b77f0b78bcf99dde" ON "carts_dvds_dvd" ("cartsCartId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_98333aa7774a3257a4a37bf534" ON "carts_dvds_dvd" ("dvdDvdId") `
    )
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_ce6e842aa1de546a30f9ecad075" FOREIGN KEY ("dvdDvdId") REFERENCES "dvd"("dvd_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvd" ADD CONSTRAINT "FK_01c50d0167b77f0b78bcf99dde6" FOREIGN KEY ("cartsCartId") REFERENCES "carts"("cart_id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvd" ADD CONSTRAINT "FK_98333aa7774a3257a4a37bf534d" FOREIGN KEY ("dvdDvdId") REFERENCES "dvd"("dvd_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `
          INSERT INTO "users" ("name", "email", "password", "isAdm")
          VALUES ('gabriel', 'kenzie@mail.com', '${hashSync(
            'umaSenhaForte!',
            10
          )}', true)
        `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvd" DROP CONSTRAINT "FK_98333aa7774a3257a4a37bf534d"`
    )
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvd" DROP CONSTRAINT "FK_01c50d0167b77f0b78bcf99dde6"`
    )
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4"`
    )
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_ce6e842aa1de546a30f9ecad075"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_98333aa7774a3257a4a37bf534"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01c50d0167b77f0b78bcf99dde"`
    )
    await queryRunner.query(`DROP TABLE "carts_dvds_dvd"`)
    await queryRunner.query(`DROP TABLE "carts"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "dvd"`)
    await queryRunner.query(`DROP TABLE "stock"`)
  }
}
