import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import TransaksiValidator from "App/Validators/TransaksiValidator";
import random from "random-string-generator";
import date from "date-and-time";

// Model
import Transaksi from "App/Models/Transaksi";
import User from "App/Models/User";
import Menu from "App/Models/Menu";
import Meja from "App/Models/Meja";
import DetailTransaksi from "App/Models/DtlTransaksi";

export default class TransaksesController {
  public async index({ request }: HttpContextContract) {
    const transaksi = await Database.from("transaksis")

      // get data from table transaksi and join with table detail_transaksi and table menu and table meja and users
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      );

    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);

      return merged;
    }
  }
  public async getStatus_BelumBayar({ request }: HttpContextContract) {
    const transaksi = await Database.from("transaksis")
      // get data from table transaksi and join with table detail_transaksi and table menu and table meja
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      )
      .where("transaksis.status_transaksi", "belum bayar");
    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu and table meja to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);
      return {
        message: "Data berhasil diubah",
        transaksi: merged,
      };
    }
  }
  public async getStatus_SudahBayar({ request }: HttpContextContract) {
    const transaksi = await Database.from("transaksis")
      // get data from table transaksi and join with table detail_transaksi and table menu and table meja
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      )
      .where("transaksis.status_transaksi", "sudah bayar");
    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu and table meja to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);
      return {
        message: "Data berhasil diubah",
        transaksi: merged,
      };
    }
  }
  public async getbyDate({ request }: HttpContextContract) {
    const date = request.params().date;
    // format date to YYYY-MM-DD
    const dateformat = date.split("-").reverse().join("-");
    const transaksi = await Database.from("transaksis")
      // get data from table transaksi and join with table detail_transaksi and table menu and table meja
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      )
      .where("transaksis.tgl_transaksi", date);

    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu and table meja to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);
      return {
        message: "Data berhasil diubah",
        transaksi: merged,
      };
    }
  }

  // get transaksi by start_date and end_date
  public async getTransaksiByDate({ request }: HttpContextContract) {
    // buatkan filter transaksi berdasarkan tanggal
    let start_date = request.params().start_date;
    let end_date = request.params().end_date;
    const transaksi = await Database.from("transaksis")
      // get data from table transaksi and join with table detail_transaksi and table menu and table meja
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      )
      .whereBetween("transaksis.tgl_transaksi", [start_date, end_date]);

    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu and table meja to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);
      return {
        message: "Data berhasil diubah",
        transaksi: merged,
      };
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(TransaksiValidator);
    const transaksi = new Transaksi();
    const now = new Date();
    const detailTransaksi = new DetailTransaksi();

    const kode_transaksi = random("alphanumeric");

    const rawRequest = request.raw();
    const parsedJson = JSON.parse(rawRequest);

    const id_meja = parsedJson.id_meja;
    const id_user = parsedJson.id_user;
    const nama_pelanggan = parsedJson.nama_pelanggan;
    const tgl_transaksi = date.format(now, "YYYY-MM-DD");
    const status_transaksi = parsedJson.status_transaksi;
    const dtl_transaksi = parsedJson.dtl_transaksi;

    const checkMeja = await Meja.findBy("id", id_meja);

    if (checkMeja == null) {
      return { message: "Meja tidak ditemukan" };
    } else {
      transaksi.kode_transaksi = kode_transaksi;
      transaksi.nama_pelanggan = nama_pelanggan;
      transaksi.tgl_transaksi = tgl_transaksi;
      transaksi.id_meja = id_meja;
      transaksi.id_user = id_user;
      transaksi.status_transaksi = status_transaksi;
      await transaksi.save();
      dtl_transaksi.forEach(async (element: any) => {
        const id_menu = element.id_menu;
        const qty = element.qty;
        const checkMenu = await Menu.findBy("id", id_menu);
        if (checkMenu == null) {
          return { message: "Menu tidak ditemukan" };
        } else {
          detailTransaksi.id_transaksi = transaksi.id;
          detailTransaksi.id_menu = id_menu;
          detailTransaksi.qty = qty;
          detailTransaksi.total = checkMenu.harga * qty;
          await detailTransaksi.save();

          const updateStok = await Menu.find(id_menu);
          updateStok.stok = updateStok.stok - qty;
          await updateStok.save();

          const updateMeja = await Meja.find(id_meja);
          updateMeja.status_meja = "Terisi";
          await updateMeja.save();
        }
      });
      let datas = {
        message: "Data berhasil ditambahkan",
        data: {
          transaksi: transaksi,
          dtl_transaksi: [dtl_transaksi],
        },
      };
      return datas;
    }
  }

  public async show({ request }: HttpContextContract) {
    const id = request.params().id;
    const transaksi = await Database.from("transaksis")
      // get data from table transaksi and join with table detail_transaksi and table menu and table meja
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      )
      .where("transaksis.kode_transaksi", id);
    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu and table meja to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);
      return {
        message: "Data berhasil ditemukan",
        transaksi: merged,
      };
    }
  }

  public async setSudahBayar({ request }: HttpContextContract) {
    const transaksis = await Transaksi.findBy(
      "kode_transaksi",
      request.params().id
    );
    transaksis.status_transaksi = "sudah bayar";
    transaksis.save();

    const transaksi = await Database.from("transaksis")
      // get data from table transaksi and join with table detail_transaksi and table menu and table meja
      .innerJoin(
        "dtl_transaksis",
        "transaksis.id",
        "dtl_transaksis.id_transaksi"
      )
      .innerJoin("users", "transaksis.id_user", "users.id")
      .innerJoin("menus", "dtl_transaksis.id_menu", "menus.id")
      .innerJoin("mejas", "transaksis.id_meja", "mejas.id")
      .select(
        "transaksis.*",
        "users.*",
        "dtl_transaksis.*",
        "menus.*",
        "mejas.*"
      )
      .where("transaksis.kode_transaksi", request.params().id);

    if (transaksi.length == 0) {
      return { message: "Data tidak ditemukan" };
    } else {
      // merged data from table transaksi and table detail_transaksi and table menu and table meja to one array object
      const merged = transaksi.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (el: any) => el.kode_transaksi === cur.kode_transaksi
        );
        if (found) {
          found.dtl_transaksi.push({
            id_menu: cur.id_menu,
            nama_menu: cur.nama_menu,
            harga: cur.harga,
            qty: cur.qty,
            total: cur.total,
          });
        } else {
          acc.push({
            id: cur.id,
            kode_transaksi: cur.kode_transaksi,
            id_user: {
              id: cur.id_user,
              username: cur.username,
              email: cur.email,
              role: cur.role,
            },
            nama_pelanggan: cur.nama_pelanggan,
            tgl_transaksi: cur.tgl_transaksi,
            status_transaksi: cur.status_transaksi,
            meja: {
              id: cur.id_meja,
              nama_meja: cur.nama_meja,
              status_meja: cur.status_meja,
            },
            dtl_transaksi: [
              {
                id_menu: cur.id_menu,
                nama_menu: cur.nama_menu,
                harga: cur.harga,
                qty: cur.qty,
                total: cur.total,
              },
            ],
          });
        }
        return acc;
      }, []);
      return {
        message: "Data berhasil diubah",
        transaksi: merged,
      };
    }
  }

  public async update({ request }: HttpContextContract) {
    const transaksis = await Transaksi.findBy(
      "kode_transaksi",
      request.params().id
    );
    const detailTransaksi = await DetailTransaksi.findBy(
      "id_transaksi",
      transaksis.id
    );
    if (transaksis == null || transaksis == undefined) {
      return { message: "Data tidak ditemukan" };
    } else {
      await request.validate(TransaksiValidator);
      const rawRequest = request.raw();
      const parsedJson = JSON.parse(rawRequest);

      const id_meja = parsedJson.id_meja;
      const id_user = parsedJson.id_user;
      const nama_pelanggan = parsedJson.nama_pelanggan;
      const dtl_transaksi = parsedJson.dtl_transaksi;

      const checkMeja = await Meja.findBy("id", id_meja);

      if (checkMeja == null) {
        return { message: "Meja tidak ditemukan" };
      } else {
        transaksis.kode_transaksi = transaksis.kode_transaksi;
        transaksis.nama_pelanggan = nama_pelanggan;
        transaksis.id_meja = id_meja;
        transaksis.id_user = id_user;
        transaksis.status_transaksi = parsedJson.status_transaksi;
        await transaksis.save();
        dtl_transaksi.forEach(async (element: any) => {
          const id_menu = element.id_menu;
          const qty = element.qty;
          const checkMenu = await Menu.findBy("id", id_menu);
          if (checkMenu == null) {
            return { message: "Menu tidak ditemukan" };
          } else {
            detailTransaksi.id_transaksi = transaksis.id;
            detailTransaksi.id_menu = id_menu;
            detailTransaksi.qty = qty;
            detailTransaksi.total = checkMenu.harga * qty;
            await detailTransaksi.save();

            const updateMeja = await Meja.find(id_meja);
            if (
              parsedJson.statusMeja == null ||
              parsedJson.statusMeja == undefined
            ) {
              updateMeja.status_meja = "Terisi";
            } else {
              updateMeja.status_meja = parsedJson.statusMeja;
            }
            await updateMeja.save();
          }
        });
        let datas = {
          message: "Data berhasil diubah",
          data: {
            transaksi: transaksis,
            dtl_transaksi: [dtl_transaksi],
          },
        };
        return datas;
      }
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const transaksis = await Transaksi.findBy(
      "kode_transaksi",
      request.params().id
    );
    if (transaksis == null) {
      return { message: "Data tidak ditemukan" };
    } else {
      await transaksis.delete();
      return { message: "Data berhasil dihapus" };
    }
  }
}
