import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "transaksis";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string("kode_transaksi", 255).notNullable();

      table.string("nama_pelanggan", 255).notNullable();
      table
        .integer("id_meja")
        .unsigned()
        .references("id")
        .inTable("mejas")
        .onDelete("CASCADE");
      table
        .integer("id_user")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .enum("status_transaksi", ["belum bayar", "sudah bayar"])
        .notNullable();
      table.date("tgl_transaksi").notNullable();
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
