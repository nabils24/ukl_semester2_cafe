import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TransaksiValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    id_meja: schema.number(),
    id_user: schema.number(),
    nama_pelanggan: schema.string({ trim: true }),
    dtl_transaksi: schema.array().members(
      schema.object().members({
        id_menu: schema.number(),
        qty: schema.number(),
      })
    ),

    status_transaksi: schema.enum([
      "belum bayar",
      "sudah bayar",
      "cancel",
    ] as const),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    required: "The {{ field }} is required",
    "id_meja.number": "Id meja must be a number",
    "id_user.number": "Id user must be a number",
    "nama_pelanggan.string": "Nama pelanggan must be a string",
    "dtl_transaksi.array": "Detail transaksi must be an array",
    "dtl_transaksi.*.id_menu.number": "Id menu must be a number",
    "dtl_transaksi.*.qty.number": "Qty must be a number",
    "status_transaksi.enum":
      "Status_transaksi must be one of these values: belum bayar, sudah bayar, cancel",
  };
}
