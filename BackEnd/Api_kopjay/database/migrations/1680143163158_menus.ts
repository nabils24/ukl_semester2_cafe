import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "menus";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string("nama_menu", 255).notNullable();
      table.string("deskripsi", 255).notNullable();
      table
        .enum("jenis", [
          "makanan",
          "minuman",
          "snacks",
          "main course",
          "add-ons",
        ])
        .notNullable();
      table
        .enum("jenis_menu", ["signature", "milk base", "espresso", "jaya soda"])
        .notNullable();
      table.integer("stok").notNullable();
      table.string("harga", 255).notNullable();
      table.string("status_menu", 255).notNullable();
      table.string("gambar", 255).notNullable();
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
