import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Meja extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public no_meja: number

  @column()
  public nama_meja: string

  @column()
  public status_meja: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
