<template>
  <v-app>
    <auth />
    <SideBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="12">
          <v-row class="mx-5 my-5" style="justify-content: space-around">
            <v-col
              lg="5"
              cols="12"
              v-for="(item, index) in activityLog"
              :key="index"
            >
              <v-card elevation="2" class="rounded-lg mx-1 my-1">
                <v-card-text class="d-flex justify-space-between align-center">
                  <div>
                    <strong>{{ item.title }}</strong> <br />
                    <span>Last 3 weeks</span>
                  </div>
                  <v-avatar
                    size="60"
                    :color="item.color"
                    style="border: 3px solid #444"
                  >
                    <span style="color: white">{{ item.amount }} +</span>
                  </v-avatar>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="5">
          <v-card class="mx-3 my-5">
            <!-- make simple pie chart -->
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-data-table
              caption="Transaksi Terbaru | Hari Ini"
              :headers="headers"
              :items="recentTransaksis"
              :items-per-page="5"
              class="elevation-1"
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <!-- make chart by using vuetify -->
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "dashboard",
  head() {
    return {
      title: "Home - Kopi Jaya",
    };
  },
  data() {
    return {
      loading: true,
      userDatas: null,
      kategori: null,
      menus: [],
      user: [],
      transaksis: [],
      ice: true,
      cartObject: {
        nama_menu: "",
        qty: "",
        harga: "",
        ukuran: "",
        mood: "",
        sugar: "",
        ice: "",
      },
      activityLog: [],
      headers: [
        {
          text: "Nama Pelanggan",
          align: "start",
          sortable: false,
          value: "nama_pelanggan",
        },
        { text: "Nama Produk", value: "dtl_transaksi" },
        { text: "Tgl Transaksi", value: "tgl_transaksi" },
        { text: "Meja", value: "meja" },
        { text: "Status", value: "status" },
        { text: "Total", value: "total" },
      ],
      recentTransaksis: [],
    };
  },
  created() {
    this.getMenus();
    this.getUser();
    this.getTransaksi();
    this.getMejas();
  },
  methods: {
    async getMejas() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("mejas", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.activityLog.push({
            title: "Total Meja",
            amount: response.data.length ? response.data.length : 0,
            icon: "mdi-account",
            color: "brown darken-2",
          });
          this.mejas = response.data;
          this.loading = false;
          console.log(this.mejas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUser() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("users", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.activityLog.push({
            title: "Total User",
            amount: response.data.length ? response.data.length : 0,
            icon: "mdi-account",
            color: "brown darken-2",
          });
          this.user = response.data;
          this.loading = false;
          console.log(this.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTransaksi() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("transaksis", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.activityLog.push({
            title: "Total transaksi",
            amount: response.data.length ? response.data.length : 0,
            icon: "mdi-account",
            color: "brown darken-2",
          });

          response.data.forEach((element) => {
            this.recentTransaksis.push({
              nama_pelanggan: element.nama_pelanggan,
              dtl_transaksi: element.dtl_transaksi
                .map((item) => item.nama_menu)
                .toString(),
              //make to format date
              tgl_transaksi: element.tgl_transaksi
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-"),

              meja: element.meja.nama_meja,
              status: element.status_transaksi,
              total:
                "Rp " +
                element.dtl_transaksi
                  .map((item) => item.harga)
                  .reduce((a, b) => parseInt(a) + parseInt(b))
                  .toLocaleString("id-ID"),
            });
          });

          console.log(this.recentTransaksis);
          this.loading = false;
          console.log(this.transaksis);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getMenus() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("menus", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          this.activityLog.push({
            title: "Total Menu",
            amount: response.data.length ? response.data.length : 0,
            icon: "mdi-account",
            color: "brown darken-2",
          });
          this.menus = response.data;
          this.loading = false;
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
</style>
