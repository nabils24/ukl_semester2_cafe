import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MejaValidator {
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
  // ini berguna untuk validasi data yang akan di post ke tabel meja
  public schema = schema.create({
    no_meja: schema.string({ trim: true }, [
      rules.unique({ table: "mejas", column: "no_meja" }),
    ]),
    nama_meja: schema.string({ trim: true }, [
      rules.unique({ table: "mejas", column: "nama_meja" }),
    ]),
    status_meja: schema.string({ trim: true }),
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
  // ini berguna untuk menampilkan pesan error jika ada data yang tidak sesuai dengan schema
  public messages: CustomMessages = {
    required: "The {{ field }} is required to make a meja",
    "no_meja.required": "No Meja tidak boleh kosong",
    "no_meja.unique": "No Meja sudah terdaftar",
    "nama_meja.required": "Nama Meja tidak boleh kosong",
    "nama_meja.unique": "Nama Meja sudah terdaftar",
    "status_meja.required": "Status tidak boleh kosong",
  };
}
