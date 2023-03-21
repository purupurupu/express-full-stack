import { MigrationInterface, QueryRunner } from "typeorm";

export class sql1679407589977 implements MigrationInterface {
  name = "sql1679407589977";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`createdAt\` TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updatedAt\` TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
  }
}
