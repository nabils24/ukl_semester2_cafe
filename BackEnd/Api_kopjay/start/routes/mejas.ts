import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  //Meja
  Route.get("/mejas", "MejasController.index");
  Route.post("/mejas", "MejasController.store");
  Route.get("/mejas/:id", "MejasController.show");
  Route.post("/mejas/available", "MejasController.MejaAvailable");
  Route.put("/mejas/:id", "MejasController.update");
  Route.delete("/mejas/:id", "MejasController.destroy");
}).prefix("api");
