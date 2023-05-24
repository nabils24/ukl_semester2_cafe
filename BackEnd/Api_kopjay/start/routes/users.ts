import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  //User
  Route.get("/users", "UsersController.index");
  Route.post("/users", "UsersController.store");
  Route.get("/users/:id", "UsersController.show");
  Route.put("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.destroy");
}).prefix("api");

// http://localhost:8080/api/users methos GET | SEMUA
// http://localhost:8080/api/users methos POST | TAMBAH
// http://localhost:8080/api/users/:id methos GET | CARI
// http://localhost:8080/api/users/:id methos PUT | UPDATE
// http://localhost:8080/api/users/:id methos DELETE | HAPUS