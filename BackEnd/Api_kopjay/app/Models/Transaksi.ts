import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Transaksi extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public kode_transaksi: string;

  @column()
  public nama_pelanggan: string;

  @column()
  public id_meja: number;

  @column()
  public id_user: number;

  @column()
  public status_transaksi: string;

  @column()
  public tgl_transaksi: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
