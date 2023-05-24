import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class SilentAuthMiddleware {
  /**
   * Handle request
   */
  public async handle(
    { request, response, auth }: HttpContextContract,
    next: () => Promise<void>
  ) {
    await auth.use("api").check();

    if (auth.use("api").isLoggedIn) {
      await next();
    } else {
      return response.status(401).json({
        logged: false,
        message: "Unauthorized, There is no token in Authorization",
      });
    }
  }
}
