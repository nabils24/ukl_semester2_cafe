import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string("username", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 180).notNullable();
      table.enum("role", ["admin", "kasir", "manajer", "members"]).notNullable();
      table.string("status_user", 255).notNullable();
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
