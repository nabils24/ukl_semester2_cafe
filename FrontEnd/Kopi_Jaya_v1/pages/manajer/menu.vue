<template>
  <v-app>
    <auth />
    <SideBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="5">
          <v-card class="mx-3 my-5">
            <!-- make simple pie chart -->
            <canvas id="myPiechart"></canvas>
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
      script: [{ src: "https://cdn.jsdelivr.net/npm/chart.js" }],
    };
  },
  data() {
    return {
      loading: true,
      userDatas: null,
      kategori: null,
      menus: [],
      user: [],
      oftenOrder_label: [],
      oftenOrder_value: [],
      oftenOrder: [],
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
      filteredMenus: [],

      mostOrderedMenu: "",
      mostOrderedQty: 0,
      leastOrderedMenu: "",
      leastOrderedQty: Infinity,
    };
  },
  mounted() {},
  created() {
    this.getMenus();
    this.getUser();
    this.getTransaksi();
    this.getMejas();
  },
  methods: {
    calculateOrderStats() {
      const countMap = this.filteredMenus.reduce((acc, menu) => {
        if (acc.hasOwnProperty(menu.nama_menu)) {
          acc[menu.nama_menu] += menu.qty;
        } else {
          acc[menu.nama_menu] = menu.qty;
        }
        return acc;
      }, {});

      for (const menu in countMap) {
        if (countMap[menu] > this.mostOrderedQty) {
          this.mostOrderedMenu = menu;
          this.mostOrderedQty = countMap[menu];
        }
        if (countMap[menu] < this.leastOrderedQty) {
          this.leastOrderedMenu = menu;
          this.leastOrderedQty = countMap[menu];
        }
      }
      console.log(
        "most ordered menu",
        this.mostOrderedMenu,
        "dengan banyak pesanan",
        this.mostOrderedQty
      );
      console.log(
        "least ordered menu",
        this.leastOrderedMenu,
        "dengan banyak pesanan",
        this.leastOrderedQty
      );
    },
    async createPieChart() {
      // Mengambil elemen canvas
      var ctx = document.getElementById("myPiechart").getContext("2d");

      // Membuat chart baru
      var myChart = new Chart(ctx, {
        type: "pie", // Jenis chart yang digunakan (pie chart)
        data: {
          labels: [
            "Pesanan Paling banyak dipesan " + this.mostOrderedMenu,
            "Palingg Sedikit dipesan " + this.leastOrderedMenu,
          ], // Label untuk setiap sektor
          datasets: [
            {
              label: "Menu", // Label data set
              data: [this.mostOrderedQty, this.leastOrderedQty], // Data untuk setiap sektor
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
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
    async filterMenus() {},

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
              dtl_transaksi: element.dtl_transaksi,
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

          // get all dtl_transaksi from recentTransaksis and into in filteredMenus
          this.recentTransaksis.forEach((element) => {
            element.dtl_transaksi.forEach((element) => {
              this.filteredMenus.push(element);
            });
          });
          console.log(this.filteredMenus);
          this.calculateOrderStats();
          this.createPieChart();
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
