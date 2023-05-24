import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  //Menus
  Route.get("/menus", "MenusController.index").middleware("Auth");
  Route.get("/menus/img/:id", "MenusController.getImage");
  Route.post("/menus", "MenusController.store").middleware("Auth");
  Route.get("/menus/:id", "MenusController.show").middleware("Auth");
  Route.post(
    "/menus/search/nama_menu",
    "MenusController.showByName"
  ).middleware("Auth");
  Route.put("/menus/:id", "MenusController.update").middleware("Auth");
  Route.delete("/menus/:id", "MenusController.destroy").middleware("Auth");
}).prefix("api");
