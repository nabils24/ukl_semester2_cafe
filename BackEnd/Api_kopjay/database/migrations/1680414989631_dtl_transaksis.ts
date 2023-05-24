import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dtl_transaksis";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table
        .integer("id_transaksi")
        .unsigned()
        .references("id")
        .inTable("transaksis")
        .onDelete("CASCADE");
      table
        .integer("id_menu")
        .unsigned()
        .references("id")
        .inTable("menus")
        .onDelete("CASCADE");
      table.integer("qty").notNullable();
      table.integer("total").notNullable();

      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
