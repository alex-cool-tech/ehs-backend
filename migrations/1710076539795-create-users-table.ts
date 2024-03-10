import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1710076539795 implements MigrationInterface {
  name = 'CreateUsersTable1710076539795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_roles_enum" AS ENUM('admin', 'teacher')`,
    );
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"           SERIAL                            NOT NULL,
                                 "login"        character varying(255)            NOT NULL,
                                 "passwordHash" character varying(255)            NOT NULL,
                                 "name"         character varying(255)            NOT NULL,
                                 "roles"        "public"."users_roles_enum" array NOT NULL,
                                 CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
  }
}
