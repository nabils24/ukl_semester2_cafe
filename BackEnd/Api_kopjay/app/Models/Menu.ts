import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nama_menu: string;

  @column()
  public deskripsi: string;

  @column()
  public jenis: string;

  @column()
  public jenis_menu: string;

  @column()
  public stok: number;

  @column()
  public harga: number;

  @column()
  public status_menu: string;

  @column()
  public gambar: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
