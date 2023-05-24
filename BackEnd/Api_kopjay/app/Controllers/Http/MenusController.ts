import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import MenuValidator from "App/Validators/MenuValidator";
import { unlink } from "fs";

import Menu from "App/Models/Menu";

export default class MenusController {
  public async index({ request }: HttpContextContract) {
    const menu = await Menu.all();
    return menu;
  }

  public async store({ request }: HttpContextContract) {
    await request.validate(MenuValidator);
    const menu = new Menu();
    const gambar = request.file("gambar", {
      // ukuran gambar
      size: "2mb",
      // format gambar
      extnames: ["jpg", "png", "gif"],
    });

    if (gambar) {
      await gambar.move(Application.publicPath("uploads/menus"), {
        name: `menus_${new Date().getTime()}.${gambar.extname}`,
        overwrite: true,
      });
    }
    const fileName = gambar.fileName;
    menu.nama_menu = request.input("nama_menu");
    menu.deskripsi = request.input("deskripsi");
    menu.jenis = request.input("jenis");
    menu.jenis_menu = request.input("jenis_menu");
    menu.stok = request.input("stok");
    menu.harga = request.input("harga");
    menu.status_menu = request.input("status_menu");
    menu.gambar = fileName;
    await menu.save();
    return menu;
  }

  public async show({ params }: HttpContextContract) {
    const menu = await Menu.findBy("id", params.id);
    return menu;
  }
  // ini berguna untuk ngeget data berdasarkan nama dari tabel menu
  public async showByName({ request }: HttpContextContract) {
    const menu = await Menu.query().where(
      "nama_menu",
      "like",
      `%${request.input("nama_menu")}%`
    );
    return menu;
  }

  // ini berguna untuk update menu berdasarkan id dari tabel menu
  public async update({ params, request }: HttpContextContract) {
    const menu = await Menu.find(params.id);
    const gambar = request.file("gambar", {
      size: "2mb",
      extnames: ["jpg", "png", "gif"],
    });

    if (gambar) {
      await gambar.move(Application.publicPath("uploads/menus"), {
        name: `menus_${new Date().getTime()}.${gambar.extname}`,
        overwrite: true,
      });
      unlink(
        Application.publicPath("uploads/menus/") + `${menu?.gambar}`,
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
    }

    const fileName = gambar?.fileName;

    menu.gambar = fileName;

    menu.nama_menu = request.input("nama_menu");
    menu.jenis = request.input("jenis");
    menu.jenis_menu = request.input("jenis_menu");
    menu.deskripsi = request.input("deskripsi");
    menu.stok = request.input("stok");
    menu.jumlah = request.input("jumlah");
    menu.harga = request.input("harga");
    menu.status_menu = request.input("status_menu");
    menu.gambar = fileName;
    await menu.save();
    return menu;
  }

  // ini berguna untuk menghapus menu berdasarkan id dari tabel menu
  public async destroy({ params }: HttpContextContract) {
    const menu = await Menu.find(params.id);
    unlink(
      Application.publicPath("uploads/menus/") + `${menu?.gambar}`,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    await menu?.delete();
    return menu;
  }

  // ini berguna untuk mengambil gambar dari tabel menu
  public async getImage({ request, response }: HttpContextContract) {
    const menu = await Menu.findBy("id", request.params().id);
    if (menu) {
      return response.download(
        Application.publicPath("uploads/menus/") + menu.gambar
      );
    } else {
      return response.status(404).json({ message: "Image not found" });
    }
  }
}
