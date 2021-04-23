import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1618936145433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid", //id universal, p n repetir
                        isPrimary: true
                    },
                    {
                        name:"username",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolena",
                        default: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",  //criar o registro com a data atual já
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings")
    }

}
