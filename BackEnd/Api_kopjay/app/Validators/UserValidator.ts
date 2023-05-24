import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
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
    username: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(20),
      rules.unique({ table: "users", column: "username" }),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(20),
    ]),
    role: schema.enum(["admin", "manajer", "kasir"] as const),
    status_user: schema.enum(["active", "inactive"] as const),
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
    "username.minLength": "Username must be at least 3 characters",
    "username.maxLength": "Username must be at most 20 characters",
    "username.unique": "Username already exists",
    "email.email": "Email must be a valid email",
    "email.unique": "Email already exists",
    "password.minLength": "Password must be at least 6 characters",
    "password.maxLength": "Password must be at most 20 characters",
    "role.enum": "Role must be admin, manajer, or kasir",
    "status_user.enum": "Status must be active or inactive",
  };
}
