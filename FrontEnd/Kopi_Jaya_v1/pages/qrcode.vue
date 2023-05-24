<template>
  <v-app>
    <v-col cols="12" sm="6" md="8" lg="12">
      <div :hidden="hidepayment">
        <v-row align="center" justify="center" style="height: 100vh">
          <v-col cols="12" sm="4" md="5" lg="3">
            <v-container>
              <v-card>
                <v-img
                  src="https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/5c3d5f54-b6a8-4ef7-923d-539591b04a46_restaurant-image_1595833883341.jpg"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  cover
                />
                <v-card-title
                  >Pembayaran Atas Nama : {{ userPaymentDatas.nama }}
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Kode Transaksi"
                      outlined
                      dense
                      type="text"
                      v-model="userPaymentDatas.kode_transaksi"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="nama"
                      outlined
                      dense
                      v-model="userPaymentDatas.nama"
                      type="text"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="Pesanan"
                      outlined
                      dense
                      v-model="userPaymentDatas.menu"
                      type="text"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="Meja"
                      outlined
                      dense
                      v-model="userPaymentDatas.meja"
                      type="text"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="Total"
                      outlined
                      dense
                      type="text"
                      v-model="userPaymentDatas.totalView"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="Bayar"
                      outlined
                      dense
                      v-model="userPaymentDatas.tunai"
                      type="number"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-col cols="12" sm="6" md="8" lg="12">
                  <v-row align="center" justify="center">
                    <v-card-actions class="mb-4">
                      <v-btn
                        color="primary"
                        @click="bayarApi()"
                        style="width: 100px"
                        >bayar</v-btn
                      >
                    </v-card-actions>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="8" lg="12">
                  <v-snackbar v-model="alert.show">
                    {{ alert.text }}

                    <template v-slot:action="{ attrs }">
                      <v-btn
                        color="blue"
                        text
                        v-bind="attrs"
                        @click="alert.show = false"
                      >
                        Close
                      </v-btn>
                    </template>
                  </v-snackbar>
                </v-col>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </div>
      <div :hidden="hideAnimSuccess">
        <v-row align="center" justify="center" style="height: 100vh">
          <v-col cols="12" sm="4" md="5" lg="3">
            <v-container>
              <div class="success-animation">
                <svg
                  class="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    class="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    class="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg></div
            ></v-container>
            <v-spacer></v-spacer>
            <v-row justify="center">
              <v-btn
                color="primary"
                @click="
                  (hideAnimSuccess = true),
                    (hideDetail = false),
                    getTransaksiFromKodeTransaksi()
                "
                >Lihat Detail</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div :hidden="hideDetail">
        <v-row align="center" justify="center" style="height: 100vh">
          <v-col cols="12" sm="8" md="8" lg="8" class="px-5 py-5">
            <v-alert
              border="top"
              colored-border
              color="green lighten-2"
              elevation="2"
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
                    ><h4 class="mr-2">{{ struk.kode_transaksi }}</h4></v-col
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
                    ><h4 class="mr-2">{{ struk.kasir }}</h4></v-col
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
                    ><h4 class="mr-2">{{ struk.nama_pelanggan }}</h4></v-col
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
                <v-row class="mt-4 pt-2" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Tunai :</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      Rp {{ userPaymentDatas.tunai | formatAngka }}
                    </h4></v-col
                  >
                </v-row>
                <v-row class="" style="align-items: center">
                  <v-col cols="12" lg="2" md="2">
                    <h4 class="ml-2">Kembalian :</h4>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" lg="2" md="2" class="text-end"
                    ><h4 class="mr-2">
                      Rp {{ userPaymentDatas.kembalian | formatAngka }}
                    </h4></v-col
                  >
                </v-row>
              </div>
              <div class="text-center mt-5 mb-4 pt-5">
                <h3>Suwun Wes Mampir Ndek kene ker!</h3>
                <h5>Hormat awak dewe!</h5>
              </div>
            </v-alert>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-app>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      hidepayment: false,
      hideAnimSuccess: true,
      hideDetail: true,

      alert: {
        text: "",
        show: false,
      },

      userPaymentDatas: {
        kode_transaksi: "",
        nama: "",
        menu: "",
        meja: "",
        total: 0,
      },
      struk: [],
    };
  },
  mounted() {
    this.getDatasFromParams();
  },
  methods: {
    async bayarApi() {
      if (this.userPaymentDatas.tunai < this.userPaymentDatas.total) {
        this.alert.text = "Uang anda kurang";
        this.alert.show = true;
      } else if (this.userPaymentDatas.tunai >= this.userPaymentDatas.total) {
        let tokens = JSON.parse(sessionStorage.getItem("token"));
        this.$axios
          // Terakhir disini mau edit api bayar cek di api postman 9:19 4/21/2023
          .get("transaksis/success/" + this.userPaymentDatas.kode_transaksi)
          .then((response) => {
            this.hidepayment = true;
            this.hideAnimSuccess = false;
            this.hideDetail = true;
            if (this.userPaymentDatas.tunai >= this.userPaymentDatas.total) {
              let kembalian =
                this.userPaymentDatas.tunai - this.userPaymentDatas.total;
              this.userPaymentDatas.kembalian = kembalian;
            } else {
              this.userPaymentDatas.kembalian = 0;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async getTransaksiFromKodeTransaksi() {
      this.$axios.setToken(false);
      this.$axios
        // Terakhir disini mau edit api bayar cek di api postman 9:19 4/21/2023
        .get("transaksis/" + this.userPaymentDatas.kode_transaksi)
        .then((response) => {
          // make struk
          this.struk = response.data.transaksi[0];
          // buatkan total harga keseluruhan dari data struk.dtl_transaksi yang di looping dan dikalikan dengan harga dan di simpan ke struk.total
          let total = 0;
          this.struk.dtl_transaksi.forEach((element) => {
            total += element.harga * element.qty;
          });
          this.struk.kasir =  response.data.transaksi[0].id_user.username;
          this.struk.total_seluruh = total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getDatasFromParams() {
      const { kode_transaksi, nama, meja, menu, total } = this.$route.query;
      this.userPaymentDatas.kode_transaksi = kode_transaksi;
      this.userPaymentDatas.nama = nama;
      this.userPaymentDatas.meja = meja;
      this.userPaymentDatas.menu = menu;
      this.userPaymentDatas.total = total;
      //format total to rupiah
      this.userPaymentDatas.totalView =
        "Rp " + new Intl.NumberFormat("id-ID").format(total);

      console.log(kode_transaksi, nama, meja, menu, total);
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
.rowsaya {
  background-image: url("https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/5c3d5f54-b6a8-4ef7-923d-539591b04a46_restaurant-image_1595833883341.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.success-animation {
  margin: 150px auto;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  position: relative;
  top: 5px;
  right: 5px;
  margin: 0 auto;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: #fff;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b;
  }
}
</style>
