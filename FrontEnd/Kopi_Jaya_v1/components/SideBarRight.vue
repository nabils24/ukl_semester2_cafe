<template>
  <div>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer app color="white" right width="290">
      <v-list subheader two-line class="mt-1">
        <v-list-item>
          <v-list-item-avatar rounded>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>Im {{ userDatas.role }}</v-list-item-subtitle>
            <v-list-item-title>{{ userDatas.username }}</v-list-item-title>
          </v-list-item-content>
          <!-- <v-list-item-action>
            <v-badge bordered overlap color="red" dot>
              <v-icon>mdi mdi-bell</v-icon>
            </v-badge>
          </v-list-item-action> -->
        </v-list-item>
      </v-list>
      <strong class="ml-3">Bills</strong>
      <v-list
        subheader
        two-line
        class="mt-1"
        v-for="(cart, i) in carts"
        :key="i"
      >
        <v-list-item>
          <v-list-item-avatar rounded color="grey lighten-4">
            <v-img
              v-bind:src="'http://localhost:3000/api/menus/img/' + cart.id_menu"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">{{
              cart.nama_menu
            }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ cart.qty }} x
              <div class="d-flex flex-column">
                <v-btn
                  plain
                  color="#704232"
                  small
                  @click="(dialog = true), editcart(cart.id)"
                  >Edit
                  <v-icon right>mdi-pencil</v-icon>
                </v-btn>
                <v-btn plain color="#704232" small @click="removecart(cart.id)"
                  >Delete
                  <v-icon right>mdi mdi-eraser</v-icon>
                </v-btn>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="caption"
            >Rp {{ cart.total | formatAngka }}</v-list-item-action
          >
        </v-list-item>
      </v-list>
      <v-divider class="mx-4"></v-divider>
      <v-toolbar color="rgba(0,0,0,0)" flat>
        <strong>Total</strong><v-spacer></v-spacer
        ><strong>Rp {{ totalsCarts | formatAngka }}</strong>
      </v-toolbar>

      <div class="mx-3 mt-2" :hidden="button_Pay">
        <v-btn
          color="#704232"
          block
          dark
          class="widthoutupercase"
          @click="(dialog_Pay = true), pushTopayCarts()"
          >Pay</v-btn
        >
      </div>
      <v-dialog v-model="dialog_Edit" persistent width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit {{ editCarts.nama_menu }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nama Menu*"
                    v-model="editCarts.nama_menu"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Harga*"
                    v-model="editCarts.harga"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Total*"
                    v-model="editCarts.total"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Qty*"
                    v-model="editCarts.qty"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog_Edit = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="(dialog_Edit = false), intoCart(editCarts.id)"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_Pay" persistent width="1024">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Validasi Pesanan
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Pembayaran
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">
              Validasi Pembayaran
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" step="4">
              Succes
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="8">
                    <v-text-field
                      label="Nama Pelanggan*"
                      v-model="payCarts.nama_pelanggan"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4">
                    <!-- make select for mejas in mejas and show nama_meja -->
                    <v-select
                      :items="mejas"
                      item-text="nama"
                      item-value="id"
                      label="Meja*"
                      v-model="payCarts.id_meja"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-textarea
                      label="Pesanan"
                      variant="underlined"
                      v-model="dumpPayMenus"
                      rows="4"
                      row-height="25"
                      disabled
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>

              <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

              <v-btn text @click="dialog_Pay = false"> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="12"
                    ><v-alert
                      border="left"
                      colored-border
                      color="brown darken-4"
                      elevation="2"
                    >
                      Metode Pembayaran Barcode Adalah Metode Pembayaran Yang
                      Menggunakan Barcode Scanner Untuk Melakukan Pembayaran
                      Nantinya Barcode Akan Digenerate dan discan Oleh Yang
                      Bayar
                    </v-alert>
                  </v-col>
                  <v-col cols="12" sm="6" md="12" lg="12">
                    <v-select
                      :items="metode"
                      label="Metode Pembayaran*"
                      v-model="payCarts.metode"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>

              <v-btn
                color="primary"
                @click="(e1 = 3), checkMetode(), pushIntoApiTransaksi()"
              >
                Continue
              </v-btn>

              <v-btn text @click="e1 = 1"> Back </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div :hidden="cash">
                <v-row>
                  <v-col cols="12" sm="5" md="5" lg="5">
                    <v-alert
                      border="left"
                      colored-border
                      color="brown darken-4"
                      elevation="2"
                    >
                      Uang yang harus dibayar : Rp
                      {{ totalsCarts | formatAngka }}
                    </v-alert>
                  </v-col>
                  <v-col cols="12" sm="6" md="7" lg="7">
                    <v-text-field
                      v-model="payCarts.uang"
                      label="Uang Tunai"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div :hidden="qr">
                <v-col cols="12" sm="6" md="12" lg="12">
                  <v-card color="brown darken-2" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title class="text-h5" style="color: white">
                          Generate to {{ payCarts.nama_pelanggan }}
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            class="ms-2"
                            variant="outlined"
                            size="small"
                            @click="generateQR()"
                          >
                            Generate QR
                          </v-btn>
                        </v-card-actions>
                      </div>
                      <v-col class="mx-3 my-3">
                        <v-row justify="end" no-gutters>
                          <v-avatar class="ma-3" size="125" rounded="0">
                            <v-img :src="payCarts.qr"></v-img>
                          </v-avatar>
                        </v-row>
                        <v-row justify="end">
                          <a
                            :hidden="qrnew"
                            :href="payCarts.url"
                            target="_blank"
                            style="color: white"
                            >Scan Barcode | Klik Disini</a
                          >
                        </v-row>
                      </v-col>
                    </div>
                  </v-card>
                </v-col>
              </div>

              <v-btn color="primary" @click="(e1 = 4), checkTransaksi()">
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-col cols="12" sm="6" md="12" lg="12">
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
                        <h4 class="ml-2">Status Pembayaran</h4>
                      </v-col>
                      <v-col cols="12" lg="8" md="8">
                        <v-divider></v-divider>
                      </v-col>
                      <v-col cols="12" lg="2" md="2" class="text-end"
                        ><h4 class="mr-2">
                          {{ struk.status_transaksi }}
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
                        <h4 class="ml-2">
                          {{ item.nama_menu }}({{ item.qty }}x)
                        </h4>
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
              </v-col>
              <v-btn color="primary" @click="(dialog_Pay = false), clearCart()">
                Close
              </v-btn>
              <v-btn
                color="primary"
                :disabled="loading"
                :loading="loading"
                @click="(loading = true), checkTransaksi()"
              >
                Check Pembayaran
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </v-navigation-drawer>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "SideBar_Right",
  data() {
    return {
      e1: 1,
      qr: true,
      cash: true,
      metode: ["qr"],
      qrnew: true,
      loading: false,
      dialog_Edit: false,
      dialog_Pay: false,
      button_Pay: true,
      userDatas: [],
      carts: [],
      totalsCarts: 0,
      dialog: false,
      editCarts: [],
      payCarts: [],
      succsessPay: [],
      dumpPayMenus: [],
      dumpPayDtlMenus: [],
      mejas: [],
      struk: [],
      metodePembayaran: "",
    };
  },
  created() {
    this.getuserDatas();
    this.getcartUser();
    this.getMejas();
    this.createcartUser();
  },
  methods: {
    async clearCart() {
      sessionStorage.setItem("cartUser", []);
      location.reload();
      this.getcartUser();
    },
    async checkMetode() {
      if (this.payCarts.metode == "cash") {
        this.cash = false;
        this.qr = true;
      } else if (this.payCarts.metode == "qr") {
        this.cash = true;
        this.qr = false;
      }
    },
    async checkTransaksi() {
      this.$axios
        // Terakhir disini mau edit api bayar cek di api postman 9:19 4/21/2023
        .get("transaksis/" + this.payCarts.kode_transaksi)
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
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    async generateQR() {
      let qr = await QRCode.toDataURL(
        "http://192.168.100.140:8080" +
          "/qrcode?total=" +
          this.totalsCarts +
          "&nama=" +
          this.payCarts.nama_pelanggan +
          "&meja=" +
          this.payCarts.id_meja +
          "&menu=" +
          this.dumpPayMenus +
          "&kode_transaksi=" +
          this.payCarts.kode_transaksi
      );
      this.payCarts.url =
        "http://localhost:8080" +
        "/qrcode?total=" +
        this.totalsCarts +
        "&nama=" +
        this.payCarts.nama_pelanggan +
        "&meja=" +
        this.payCarts.id_meja +
        "&menu=" +
        this.dumpPayMenus +
        "&kode_transaksi=" +
        this.payCarts.kode_transaksi;
      this.payCarts.qr = qr;
      this.qrnew = false;
      console.log("ini qrnya " + this.payCarts.qr);
    },
    async pushTopayCarts() {
      let cartUser = JSON.parse(sessionStorage.getItem("cartUser"));
      this.payCarts = cartUser;
      // get nama_menu in payCarts and make join in 1 string ex : menu1, menu2, menu3
      this.dumpPayMenus = this.payCarts
        .map((cart) => cart.nama_menu + "(" + cart.qty + "x)")
        .join(", ");

      this.dumpPayDtlMenus = this.payCarts.map((cart) => {
        return {
          id_menu: cart.id_menu,
          qty: cart.qty,
        };
      });
      this.dialog_Pay = true;
    },
    async editcart(id) {
      let cartUser = JSON.parse(sessionStorage.getItem("cartUser"));
      let index = cartUser.findIndex((cart) => cart.id == id);
      this.editCarts = cartUser[index];
      this.dialog_Edit = true;
    },
    async pushIntoApiTransaksi() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      let newDatasQR = {
        nama_pelanggan: this.payCarts.nama_pelanggan,
        id_meja: this.payCarts.id_meja,
        id_user: this.userDatas.id,
        status_transaksi: "belum bayar",
        dtl_transaksi: this.dumpPayDtlMenus,
      };
      let newDatasTunai = {
        nama_pelanggan: this.payCarts.nama_pelanggan,
        id_meja: this.payCarts.id_meja,
        status_transaksi: "sudah bayar",
        dtl_transaksi: this.dumpPayDtlMenus,
      };
      if (this.payCarts.metode == "qr") {
        this.$axios
          .post("transaksis", newDatasQR, {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          })
          .then((response) => {
            this.succsessPay.transaksi = response.data.data;
            this.payCarts.kode_transaksi =
              response.data.data.transaksi.kode_transaksi;
            console.log(this.payCarts.kode_transaksi);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.payCarts.metode == "cash") {
        this.$axios
          .post("transaksis", newDatasTunai, {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          })
          .then((response) => {
            this.succsessPay.transaksi = response.data;
            this.payCarts.kode_transaksi = response.data.kode_transaksi;
            console.log(this.succsessPay.transaksi);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async intoCart(id) {
      let cartUser = JSON.parse(sessionStorage.getItem("cartUser"));
      let index = cartUser.findIndex((cart) => cart.id == id);
      cartUser[index].qty = this.editCarts.qty;
      cartUser[index].total = this.editCarts.qty * this.editCarts.harga;
      sessionStorage.setItem("cartUser", JSON.stringify(cartUser));
      this.getcartUser();
    },
    async removecart(id) {
      let cartUser = JSON.parse(sessionStorage.getItem("cartUser"));
      let index = cartUser.findIndex((cart) => cart.id == id);
      cartUser.splice(index, 1);
      sessionStorage.setItem("cartUser", JSON.stringify(cartUser));
      this.getcartUser();
    },
    async getcartUser() {
      let cartUser = JSON.parse(sessionStorage.getItem("cartUser"));
      this.carts = cartUser;
      if (this.carts.length == 0) {
        // sum all carts.harga and make into totalCarts
        this.totalsCarts = 0;
      } else {
        // buatkan total harga dari cart yang ada dan kalikan dengan jumlah qtynya dan masukan ke totalCarts
        this.totalsCarts = this.carts
          .map((cart) => cart.harga * cart.qty)
          .reduce((a, b) => a + b);
      }
      if (this.totalsCarts > 0) {
        this.button_Pay = false;
      } else {
        this.button_Pay = true;
      }
    },
    async getuserDatas() {
      let userDatass = JSON.parse(sessionStorage.getItem("userDatas"));
      this.userDatas = userDatass.user;
    },
    async getMejas() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .get(
          "mejas",

          {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          }
        )
        .then((response) => {
          response.data.forEach((meja) => {
            this.mejas.push({
              id: meja.id,
              nama: meja.nama_meja,
            });
          });
          console.log(this.mejas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createcartUser() {
      if (sessionStorage.getItem("cartUser") == null) {
        sessionStorage.setItem("cartUser", JSON.stringify([]));
      } else {
        this.getcartUser();
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
.col-12 {
  padding: 5px !important;
}
.v-btn.widthoutupercase {
  text-transform: none !important;
}
</style>
  