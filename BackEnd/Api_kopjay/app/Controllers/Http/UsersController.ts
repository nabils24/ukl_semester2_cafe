import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserValidator from "App/Validators/UserValidator";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";
import md5 from "md5";

export default class UsersController {
  // 
  public async index({ request }: HttpContextContract) {
    const user = await User.all();
    if (user.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      return user;
    }
  }

  public async store({ request }: HttpContextContract) {
    // await request.validate(UserValidator);
    const user = new User();
    user.username = request.input("username");
    user.email = request.input("email");
    const hashedPassword = await Hash.make(request.input("password"));
    user.password = hashedPassword;
    user.role = request.input("role");
    user.status_user = request.input("status_user");
    await user.save();
    let datas = {
      message: "Data berhasil ditambahkan",
      data: user,
    };
    return datas;
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findBy("id", params.id);
    if (user == null) {
      return { message: "Data tidak ditemukan" };
    } else {
      return user;
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.find(params.id);
    user.username = request.input("username");
    user.email = request.input("email");
    const hashedPassword = await Hash.make(request.input("password"));
    user.password = hashedPassword;
    user.role = request.input("role");
    user.status_user = request.input("status_user");
    await user.save();
    let datas = {
      message: "Data berhasil diubah",
      data: user,
    };
    return datas;
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.find(params.id);
    if (user == null) {
      return { message: "Data tidak ditemukan" };
    } else {
      await user.delete();
      return { message: "Data berhasil dihapus" };
    }
  }
}
