<template>
  <v-app>
    <auth />
    <SideBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <v-col cols="4" class="ml-3" lg="4">
              <v-btn @click="dialog_tambah = true"> tambah users </v-btn>
              <v-btn class="ml-3" @click="reloadPage()"> refresh </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <v-col v-for="(item, i) in users" :key="i" cols="12" lg="3">
              <v-card class="mx-auto ml-5 mr-5 mt-3" max-width="344">
                <v-card-text>
                  <div>#{{ item.id }} · {{ item.status_user }}</div>
                  <p class="text-h4 text--primary">{{ item.username }}</p>
                </v-card-text>

                <v-menu>
                  <template v-slot:activator="{ on }">
                    <v-card-actions>
                      <v-btn variant="text" color="teal-accent-4" v-on="on">
                        Lihat Detail
                      </v-btn>
                    </v-card-actions>
                  </template>

                  <v-expand-transition>
                    <v-card style="height: 100%">
                      <v-card-text class="pb-0">
                        <p class="text-h4 text--primary">Detail</p>
                        <p>Status : {{ item.status_user }}</p>
                        <p>Password : *****</p>
                        <p>Email : {{ item.email }}</p>
                        <p>Role : {{ item.role }}</p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-col cols="12" lg="3">
                          <v-btn
                            variant="text"
                            color="teal-accent-4"
                            @click="getUsersByID(item.id)"
                          >
                            Edit
                          </v-btn>
                        </v-col>
                        <v-col cols="12" lg="8">
                          <v-btn variant="text" @click="deleteUsers(item.id)">
                            Delete
                          </v-btn>
                        </v-col>
                      </v-card-actions>
                    </v-card>
                  </v-expand-transition>
                </v-menu>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-dialog v-model="dialog_tambah" persistent width="1024">
          <v-card>
            <v-img
              src="https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/5c3d5f54-b6a8-4ef7-923d-539591b04a46_restaurant-image_1595833883341.jpg"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            />
            <v-card-title>Tambah Users</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="tambahUsers.nama"
                  label="Username"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="tambahUsers.email"
                  label="Email"
                  outlined
                  dense
                  type="email"
                ></v-text-field>
                <v-text-field
                  v-model="tambahUsers.password"
                  label="Password"
                  outlined
                  dense
                  type="password"
                ></v-text-field>
                <v-select
                  v-model="tambahUsers.role"
                  label="role"
                  outlined
                  dense
                  :items="['manajer', 'admin', 'kasir']"
                ></v-select>
                <v-select
                  v-model="tambahUsers.status_user"
                  label="Status User"
                  outlined
                  dense
                  :items="['active', 'inactive']"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div color="brown lighten-2">
                <v-btn class="mr-2" color="teal" @click="dialog_tambah = false">
                  Tutup
                </v-btn>
                <v-btn color="teal" @click="tambahUsersKu()"> Simpan </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-dialog v-model="dialog_edit" persistent width="1024">
          <v-card>
            <v-img
              src="https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/5c3d5f54-b6a8-4ef7-923d-539591b04a46_restaurant-image_1595833883341.jpg"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            />
            <v-card-title>Edit Meja - No {{ editUsers.id }}</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="editUsers.nama"
                  label="Username"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="editUsers.email"
                  label="Email"
                  outlined
                  dense
                  type="email"
                ></v-text-field>
                <v-text-field
                  v-model="editUsers.password"
                  label="Password"
                  outlined
                  dense
                  type="password"
                ></v-text-field>
                <v-select
                  v-model="editUsers.role"
                  label="role"
                  outlined
                  dense
                  :items="['manajer', 'admin', 'kasir']"
                ></v-select>
                <v-select
                  v-model="editUsers.status_user"
                  label="Status User"
                  outlined
                  dense
                  :items="['active', 'inactive']"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div color="brown lighten-2">
                <v-btn class="mr-2" color="teal" @click="dialog_edit = false">
                  Tutup
                </v-btn>
                <v-btn color="teal" @click="updateUsers(editUsers.id)">
                  Simpan
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "table",
  head() {
    return {
      title: "users - Kopi Jaya",
    };
  },

  data() {
    return {
      dialog_edit: false,
      dialog_tambah: false,
      tambahUsers: {},
      editUsers: {},
      users: [],
    };
  },

  created() {
    this.getUsers();
  },
  methods: {
    async reloadPage() {
      // reload page
      this.$nuxt.refresh();
      this.$forceUpdate();
      window.location.reload(true);
      this.$router.app.refresh();
    },
    async tambahUsersKu() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .post(
          "users",
          {
            username: this.tambahUsers.nama,
            email: this.tambahUsers.email,
            password: this.tambahUsers.password,
            role: this.tambahUsers.role,
            status_user: this.tambahUsers.status_user,
          },
          {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          }
        )
        .then((response) => {
          this.dialog_tambah = false;
          console.log(this.response.data);
          this.reloadPage();
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteUsers(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .delete("users/" + id, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          console.log(this.response.data);
          this.reloadPage();
          this.$nuxt.refresh();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateUsers(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .put(
          "users/" + id,
          {
            username: this.editUsers.nama,
            email: this.editUsers.email,
            password: this.editUsers.password,
            role: this.editUsers.role,
            status_user: this.editUsers.status_user,
          },
          {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          }
        )
        .then((response) => {
          this.dialog_edit = false;
          console.log(this.response.data);
          this.reloadPage();
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUsersByID(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("users/" + id, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.dialog_edit = true;
          this.editUsers = {
            id: response.data.id,
            nama: response.data.username,
            email: response.data.email,
            role: response.data.role,
            status: response.data.status_user,
            password: response.data.password,
          };
          console.log(this.editUsers);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUsers() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("users", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          response.data.forEach((user) => {
            this.users.push({
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
              status_user: user.status_user,
              password: user.password,
            });
          });
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  filters: {
    formatAngka(angka) {
      return new Intl.NumberFormat("id-ID").format(angka);
    },
    formatTanggal(tanggal) {
      return new Date(tanggal).toLocaleDateString("id-ID");
    },
  },
};
</script>
<style>
.v-card.borderme {
  border: 2px solid #704232 !important;
}
.v-card.borderout {
  border: 1px solid #bcaaa4 !important;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
