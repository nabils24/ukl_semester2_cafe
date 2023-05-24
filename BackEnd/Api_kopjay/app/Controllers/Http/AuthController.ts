import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import jwt from "jsonwebtoken";
import md5 from "md5";

export default class AuthController {
  public async authenticate({ request }: HttpContextContract) {
    const email = request.input("email");
    const password = md5(request.input("password"));

    const user = await User.findBy("email", email);

    if (!user) {
      return "User not found";
    }

    if (user.password !== password) {
      return "Password not match";
    }

    let payload = JSON.stringify(user);
    let secret = "Kopjay123";
    let token = jwt.sign(payload, secret);

    return {
      logged: true,
      token: token,
      user: user,
    };
  }
  public async authorize({ request }: HttpContextContract) {
    const Token = request.header("Authorization");
    let tokenkey = Token?.split(" ")[1];
    if (!tokenkey) {
      return {
        logged: false,
        message: "Token not found",
      };
    }
    let secret = `Kopjay123`;
    let payload = jwt.verify(tokenkey, secret);
    return {
      logged: true,
      token: tokenkey,
    };
  }

}
