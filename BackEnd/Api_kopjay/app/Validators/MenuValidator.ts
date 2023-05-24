import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MenuValidator {
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
    nama_menu: schema.string({ trim: true }, [
      rules.unique({ table: "menus", column: "nama_menu" }),
    ]),
    deskripsi: schema.string({ trim: true }),
    harga: schema.number(),
    gambar: schema.file({
      size: "2mb",
      extnames: ["jpg", "png", "jpeg"],
    }),
    stok: schema.number(),
    status_menu: schema.string({ trim: true }),
    jenis: schema.string({ trim: true }),
    jenis_menu: schema.string({ trim: true }),
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
    required: "The {{ field }} is required to create a new menu",
    "nama_menu.unique": "Menu sudah ada",
    "gambar.size": "File size terlalu besar",
    "gambar.extnames": "File type tidak support",
    "status_menu.required": "Status tidak boleh kosong",
  };
}
