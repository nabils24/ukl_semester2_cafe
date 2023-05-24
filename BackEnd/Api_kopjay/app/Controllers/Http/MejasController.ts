import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MejaValidator from "App/Validators/MejaValidator";

import Meja from "App/Models/Meja";

export default class MejasController {
  // ini berguna untuk ngeget semua data dari tabel meja
  public async index({ request }: HttpContextContract) {
    const meja = await Meja.all();
    return meja;
  }

  // ini berguna untuk ngepost data ke tabel meja
  public async store({ request }: HttpContextContract) {
    await request.validate(MejaValidator);
    const meja = new Meja();
    meja.no_meja = request.input("no_meja");
    meja.nama_meja = request.input("nama_meja");
    meja.status_meja = request.input("status_meja");
    await meja.save();
    return meja;
  }

  // ini berguna untuk ngeget data berdasarkan id dari tabel meja
  public async show({ params }: HttpContextContract) {
    const meja = await Meja.findBy("no_meja", params.id);
    return meja;
  }

  // ini berguna untuk ngeget data berdasarkan status dari tabel meja
  public async MejaAvailable({ params }: HttpContextContract) {
    const meja = await Meja.query().where("status_meja", "kosong");
    if (meja.length == 0) {
      return "Meja tidak tersedia";
    } else {
      return meja;
    }
  }

  // ini berguna untuk update data berdasarkan id dari tabel meja
  public async update({ params, request }: HttpContextContract) {
    const meja = await Meja.find(params.id);
    meja.no_meja = request.input("no_meja");
    meja.nama_meja = request.input("nama_meja");
    meja.status_meja = request.input("status_meja");
    await meja.save();
    return meja;
  }

  // ini berguna untuk delete data berdasarkan id dari tabel meja
  public async destroy({ params }: HttpContextContract) {
    const meja = await Meja.find(params.id);
    await meja?.delete();
    return meja;
  }
}
