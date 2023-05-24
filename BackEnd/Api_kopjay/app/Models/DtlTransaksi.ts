import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class DtlTransaksi extends BaseModel {
  query() {
    throw new Error("Method not implemented.");
  }
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_transaksi: number;

  @column()
  public id_menu: number;

  @column()
  public qty: number;

  @column()
  public total: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
