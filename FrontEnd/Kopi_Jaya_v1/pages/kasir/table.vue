<template>
  <v-app>
    <auth />
    <SideBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <!-- <v-col cols="4" class="ml-3" lg="4">
              <v-btn @click="dialog_tambah = true"> tambah meja </v-btn>
              <v-btn class="ml-3" @click="reloadPage()"> refresh </v-btn>
            </v-col> -->
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <v-col v-for="(item, i) in mejas" :key="i" cols="12" lg="3">
              <v-card class="mx-auto ml-5 mr-5 mt-3" max-width="344">
                <v-card-text>
                  <div>#{{ item.id }} · {{ item.status }}</div>
                  <p class="text-h4 text--primary">{{ item.nama }}</p>
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
                        <p>Status : {{ item.status }}</p>
                        <p>No Meja : {{ item.id }}</p>
                        <p>Nama Meja : {{ item.nama }}</p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-col cols="12" lg="3">
                          <v-btn
                            variant="text"
                            color="teal-accent-4"
                            @click="getMejasByID(item.id)"
                          >
                            Edit
                          </v-btn>
                        </v-col>
                        <v-col cols="12" lg="8">
                          <v-btn variant="text" @click="deleteMejas(item.id)">
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
            <v-card-title>Tambah Kursi</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="tambahMejas.id"
                  label="No Meja"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="tambahMejas.nama"
                  label="Nama Meja"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-select
                  v-model="tambahMejas.status_meja"
                  label="Status Meja"
                  outlined
                  dense
                  :items="['kosong', 'terisi']"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div color="brown lighten-2">
                <v-btn class="mr-2" color="teal" @click="dialog_tambah = false">
                  Tutup
                </v-btn>
                <v-btn color="teal" @click="tambahMejaKu()"> Simpan </v-btn>
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
            <v-card-title>Edit Meja - No {{ editMejas.id }}</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="editMejas.id"
                  disabled
                  label="No Meja"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="editMejas.nama"
                  label="Nama Meja"
                  outlined
                  dense
                  type="text"
                ></v-text-field>
                <v-select
                  v-model="editMejas.status_meja"
                  label="Status Meja"
                  outlined
                  dense
                  :items="['kosong', 'terisi']"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div color="brown lighten-2">
                <v-btn class="mr-2" color="teal" @click="dialog_edit = false">
                  Tutup
                </v-btn>
                <v-btn color="teal" @click="updateMejas(editMejas.id)">
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
      title: "table - Kopi Jaya",
    };
  },

  data() {
    return {
      dialog_edit: false,
      dialog_tambah: false,
      tambahMejas: {},
      editMejas: {},
      mejas: [],
    };
  },

  created() {
    this.getMejas();
  },
  methods: {
    async reloadPage() {
      // reload page
      this.$nuxt.refresh();
      this.$forceUpdate();
      window.location.reload(true);
      this.$router.app.refresh();
    },
    async tambahMejaKu() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .post(
          "mejas",
          {
            no_meja: this.tambahMejas.id,
            nama_meja: this.tambahMejas.nama,
            status_meja: this.tambahMejas.status_meja,
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
          window.location.reload(true);
          this.getMejas();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteMejas(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .delete("mejas/" + id, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          console.log(this.response.data);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateMejas(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .put(
          "mejas/" + id,
          {
            no_meja: this.editMejas.id,
            nama_meja: this.editMejas.nama,
            status_meja: this.editMejas.status_meja,
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
          location.reload();
          this.getMejas();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMejasByID(id) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("mejas/" + id, {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.dialog_edit = true;
          this.editMejas = {
            id: response.data.id,
            nama: response.data.nama_meja,
            status_meja: response.data.status_meja,
          };
          console.log(this.editMejas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMejas() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("mejas", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          response.data.forEach((meja) => {
            this.mejas.push({
              id: meja.id,
              nama: meja.nama_meja,
              status: meja.status_meja,
            });
          });
          console.log(this.mejas);
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
