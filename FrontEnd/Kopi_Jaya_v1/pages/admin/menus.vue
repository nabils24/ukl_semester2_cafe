<template>
  <v-app>
    <auth />
    <SideBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <v-col cols="4" class="ml-3" lg="4">
              <v-btn @click="dialog_tambah = true"> tambah menu </v-btn>
              <v-btn class="ml-3" @click="reloadPage()"> refresh </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <v-col v-for="(item, i) in menus" :key="i" cols="12" lg="3">
              <v-card class="mx-auto ml-5 mr-5 mt-3" max-width="344">
                <v-avatar class="ma-3" size="100" rounded="">
                  <v-img
                    v-bind:src="
                      'http://localhost:3000/api/menus/img/' + item.id
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div>#{{ item.id }} · {{ item.jenis }}</div>
                  <p class="text-h5 text--primary">{{ item.nama_menu }}</p>
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
                        <p>Nama Menu : {{ item.nama_menu }}</p>
                        <p>
                          Jenis & Jenis Menu : {{ item.jenis }} -
                          {{ item.jenis_menu }}
                        </p>
                        <p>Stok : {{ item.stok }}</p>
                        <p>Harga : {{ item.harga }}</p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-col cols="12" lg="3">
                          <v-btn
                            variant="text"
                            color="teal-accent-4"
                            @click="getMenuByID(item.id)"
                          >
                            Edit
                          </v-btn>
                        </v-col>
                        <v-col cols="12" lg="8">
                          <v-btn variant="text" @click="deleteMenu(item.id)">
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
            <v-card-title>Tambah Menu</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="tambahMenu.nama_menu"
                  label="Nama Menu"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-textarea
                  v-model="tambahMenu.deskripsi"
                  label="Deskripsi Menu"
                  outlined
                  dense
                  type="text"
                ></v-textarea>
                <v-select
                  v-model="tambahMenu.jenis"
                  label="Jenis"
                  outlined
                  dense
                  :items="['makanan', 'minuman']"
                ></v-select>
                <v-select
                  v-model="tambahMenu.jenis_menu"
                  label="Jenis Menu"
                  outlined
                  dense
                  :items="['signature', 'milk base', 'espresso', 'jaya soda']"
                ></v-select>
                <v-text-field
                  v-model="tambahMenu.stok"
                  label="Stok"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="tambahMenu.harga"
                  label="harga"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-select
                  v-model="tambahMenu.status"
                  label="Status"
                  outlined
                  dense
                  :items="['ada', 'kosong']"
                ></v-select>
                <v-file-input
                  v-model="tambahMenu.gambar"
                  label="Gambar Menu"
                  outlined
                  dense
                ></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div color="brown lighten-2">
                <v-btn class="mr-2" color="teal" @click="dialog_tambah = false">
                  Tutup
                </v-btn>
                <v-btn color="teal" @click="tambahMenuKu()"> Simpan </v-btn>
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
            <v-card-title>Edit Menu - {{ editMenu.nama_menu }}</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="editMenu.nama_menu"
                  label="Nama Menu"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-textarea
                  v-model="editMenu.deskripsi"
                  label="Deskripsi Menu"
                  outlined
                  dense
                  type="text"
                ></v-textarea>
                <v-select
                  v-model="editMenu.jenis"
                  label="Jenis"
                  outlined
                  dense
                  :items="['makanan', 'minuman']"
                ></v-select>
                <v-select
                  v-model="editMenu.jenis_menu"
                  label="Jenis Menu"
                  outlined
                  dense
                  :items="['signature', 'milk base', 'espresso', 'jaya soda']"
                ></v-select>
                <v-text-field
                  v-model="editMenu.stok"
                  label="Stok"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="editMenu.harga"
                  label="harga"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-select
                  v-model="editMenu.status"
                  label="Status"
                  outlined
                  dense
                  :items="['ada', 'kosong']"
                ></v-select>
                <v-file-input
                  v-model="editMenu.gambar"
                  label="Gambar Menu"
                  outlined
                  dense
                ></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div color="brown lighten-2">
                <v-btn class="mr-2" color="teal" @click="dialog_edit = false">
                  Tutup
                </v-btn>
                <v-btn color="teal" @click="updateMenu(editMenu.id)">
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
  name: "menu",
  head() {
    return {
      title: "menus - Kopi Jaya",
    };
  },

  data() {
    return {
      dialog_edit: false,
      dialog_tambah: false,
      tambahMenu: {},
      editMenu: {},
      menus: [],
    };
  },

  created() {
    this.getMenu();
  },
  methods: {
    async reloadPage() {
      // reload page
      this.$nuxt.refresh();
      this.$forceUpdate();
      window.location.reload(true);
      this.$router.app.refresh();
    },
    async tambahMenuKu() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      // make form data from tambahMenu.gambar
      let formData = new FormData();

      formData.append("nama_menu", this.tambahMenu.nama_menu);
      formData.append("deskripsi", this.tambahMenu.deskripsi);
      formData.append("jenis", this.tambahMenu.jenis);
      formData.append("jenis_menu", this.tambahMenu.jenis_menu);
      formData.append("stok", this.tambahMenu.stok);
      formData.append("harga", this.tambahMenu.harga);
      formData.append("gambar", this.tambahMenu.gambar);
      formData.append("status_menu", this.tambahMenu.status);

      this.$axios
        .post("menus", formData, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          console.log(this.response);
          this.dialog_tambah = false;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteMenu(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));

      this.$axios
        .delete("menus/" + id, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateMenu(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      //
      let formData = new FormData();

      formData.append("nama_menu", this.editMenu.nama_menu);
      formData.append("deskripsi", this.editMenu.deskripsi);
      formData.append("jenis", this.editMenu.jenis);
      formData.append("jenis_menu", this.editMenu.jenis_menu);
      formData.append("stok", this.editMenu.stok);
      formData.append("harga", this.editMenu.harga);
      formData.append("gambar", this.editMenu.gambar);
      formData.append("status", this.editMenu.status);
      this.$axios
        .put("menus/" + id, formData, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.dialog_edit = false;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMenuByID(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));

      this.$axios
        .get("menus/" + id, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          console.log(this.response);
          this.dialog_edit = true;
          this.editMenu = {
            id: response.data.id,
            nama_menu: response.data.nama_menu,
            deskripsi: response.data.deskripsi,
            jenis: response.data.jenis,
            jenis_menu: response.data.jenis_menu,
            stok: response.data.stok,
            harga: response.data.harga,
            gambar: response.data.gambar,
            status: response.data.status_menu,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMenu() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));

      this.$axios
        .get("menus", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.menus = response.data;
          console.log(this.menus);
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
