<template>
  <v-app>
    <auth />
    <SideBar />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="12" class="mt-3">
          <v-row justify="start">
            <v-col
              v-for="(item, i) in recentTransaksis"
              :key="i"
              cols="12"
              lg="3"
            >
              <v-card class="mx-auto ml-5" max-width="344">
                <v-card-text>
                  <div>
                    {{ item.tgl_transaksi }} · {{ item.kode_transaksi }} ·
                    {{ item.meja }}
                  </div>
                  <p class="text-h4 text--primary">{{ item.nama_pelanggan }}</p>
                  <v-chip :color="item.chip.color">
                    {{ item.chip.text }}
                  </v-chip>
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
                        <p :hidden="item.status == 'sudah bayar'">
                          <v-btn
                            variant="text"
                            color="teal-accent-4"
                            @click="
                              selesaikanPembayaran(
                                item.kode_transaksi,
                                item.nama_pelanggan,
                                item.meja,
                                item.dtl_transaksi,
                                item.totals
                              )
                            "
                          >
                            Selesai Kan Pembayran?
                          </v-btn>
                        </p>
                        <p>Pesanan : {{ item.dtl_transaksi }}</p>
                        <p>Total : {{ item.total }}</p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-btn
                          variant="text"
                          color="teal-accent-4"
                          @click="lihatStruk(item.kode_transaksi)"
                        >
                          Lihat Struk
                        </v-btn>
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
        <v-dialog v-model="dialog_view" persistent width="1024">
          <v-card class="px-3 py-3">
            <v-alert
              border="top"
              colored-border
              color="green lighten-2"
              elevation="2"
              id="print"
              class="print"
              ref="print"
            >
              <div class="text-center">
                <h1>Kopi Jaya</h1>
                <h5>Jl. Pajajaran No.25D, Klojen, Malang</h5>
              </div>
              <div class="mt-5 pt-3">
                <v-row class="" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Tanggal Transaksi</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      {{ struk.tgl_transaksi | formatTanggal }}
                    </h4></v-col
                  >
                </v-row>
                <v-row class="" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Kode Transaksi</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      {{ struk.kode_transaksi }}
                    </h4></v-col
                  >
                </v-row>
                <v-row class="" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Nama Kasir</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      {{ struk.kasir }}
                    </h4></v-col
                  >
                </v-row>
                <v-row class="" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Nama Pelanggan</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      {{ struk.nama_pelanggan }}
                    </h4></v-col
                  >
                </v-row>
              </div>
              <div class="mt-5 pt-5">
                <h4 class="text-center">Detail Pesanan</h4>
                <v-row
                  class="mt-3 pt-3"
                  style="align-items: center"
                  v-for="(item, i) in struk.dtl_transaksi"
                  :key="i"
                >
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">{{ item.nama_menu }}({{ item.qty }}x)</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      Rp {{ item.harga | formatAngka }}
                    </h4></v-col
                  >
                </v-row>
              </div>
              <div class="mt-5 pt-3">
                <h4 class="text-center">Pembayaran</h4>
                <v-row class="" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Total :</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      Rp {{ struk.total_seluruh | formatAngka }}
                    </h4></v-col
                  >
                </v-row>
              </div>
              <div class="text-center mt-5 mb-4 pt-5">
                <h3>Suwun Wes Mampir Ndek kene ker!</h3>
                <h5>Hormat awak dewe!</h5>
              </div>
            </v-alert>
            <div class="mx-3 py-3" color="brown lighten-2">
              <v-btn class="mr-2" color="teal" @click="dialog_view = false">
                Tutup
              </v-btn>
              <v-btn color="teal" @click="generetePDF()"> Cetak Struk </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "dashboard",
  head() {
    return {
      title: "history - Kopi Jaya",
    };
  },

  data() {
    return {
      loading: true,
      userDatas: null,
      kategori: null,
      dialog_view: false,
      menus: [],
      user: [],
      transaksis: [],
      recentTransaksis: [],
      struk: [],
    };
  },
  created() {
    this.getTransaksi();
  },
  methods: {
    async getTransaksi() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get("transaksis", {
          headers: {
            Authorization: "Bearer " + tokens.token,
          },
        })
        .then((response) => {
          response.data.forEach((element) => {
            this.recentTransaksis.push({
              kode_transaksi: element.kode_transaksi,
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

              chip: {
                color:
                  element.status_transaksi == "sudah bayar" ? "green" : "red",
                text: element.status_transaksi,
              },
              meja: element.meja.nama_meja,
              status: element.status_transaksi,
              totals: element.dtl_transaksi
                .map((item) => item.harga)
                .reduce((a, b) => parseInt(a) + parseInt(b)),
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

    async lihatStruk(kode_transaksi) {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        // Terakhir disini mau edit api bayar cek di api postman 9:19 4/21/2023
        .get("transaksis/" + kode_transaksi)
        .then((response) => {
          // make struk
          this.struk = response.data.transaksi[0];
          // buatkan total harga keseluruhan dari data struk.dtl_transaksi yang di looping dan dikalikan dengan harga dan di simpan ke struk.total
          let total = 0;
          this.struk.dtl_transaksi.forEach((element) => {
            total += element.harga * element.qty;
          });
          this.struk.kasir = response.data.transaksi[0].id_user.username;
          this.struk.total_seluruh = total;
          this.dialog_view = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async selesaikanPembayaran(kode, nama, meja, menu, total) {
      let url =
        "http://localhost:8080" +
        "/qrcode?total=" +
        total +
        "&nama=" +
        nama +
        "&meja=" +
        meja +
        "&menu=" +
        menu +
        "&kode_transaksi=" +
        kode;

      // goto url
      window.open(url, "_blank");
    },
    async generetePDF() {
      if (this.struk == null) {
        console.log("error");
      } else {
        html2canvas(document.querySelector("#print")).then((canvas) => {
          var imgData = canvas.toDataURL("image/png");
          var imgWidth = 210;
          var pageHeight = 100;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;

          var doc = new jsPDF("p", "mm");
          var position = 0;

          doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          doc.save(
            this.struk.kode_transaksi +
              `/` +
              this.struk.nama_pelanggan +
              `/` +
              new Date(this.struk.tgl_transaksi).toLocaleDateString("id-ID") +
              `.pdf`
          );
        });
      }
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
