import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  //Menus
  Route.get("/transaksis", "TransaksesController.index").middleware("Auth");
  Route.post("/transaksis", "TransaksesController.create").middleware("Auth");
  Route.get("/transaksis/:id", "TransaksesController.show");
  // Filter
  Route.get(
    "/transaksis/filter/dates/:start_date/:end_date",
    "TransaksesController.getTransaksiByDate"
  );
  Route.get("/transaksis/filter/date/:date", "TransaksesController.getbyDate");
  // Status
  Route.get(
    "/transaksis/status/belum_bayar",
    "TransaksesController.getStatus_BelumBayar"
  );
  Route.get(
    "/transaksis/status/sudah_bayar",
    "TransaksesController.getStatus_SudahBayar"
  );
  Route.get("/transaksis/success/:id", "TransaksesController.setSudahBayar");
  Route.put("/transaksis/:id", "TransaksesController.update").middleware(
    "Auth"
  );
  Route.delete("/transaksis/:id", "TransaksesController.destroy").middleware(
    "Auth"
  );
}).prefix("api");
