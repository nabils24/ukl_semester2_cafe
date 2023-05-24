<template>
  <v-app>
    <auth />
    <SideBar />
    <SideBarRight />
    <v-container>
      <v-toolbar color="rgba(0,0,0,0)" flat>
        <v-text-field
          label="Search menu..."
          class="mt-5"
          color="brown"
          filled
          append-icon="mdi-magnify"
          dense
          solo
          flat
          :loading="search.loading"
          :rules="[search.rules]"
          v-model="search.nama_menu"
          @keydown="searchEnter"
          background-color="grey lighten-4"
          @click:append="getmenusByname()"
        ></v-text-field>
      </v-toolbar>
      <v-toolbar color="#EEEEEE" flat>
        <v-toolbar-title>Kopi Jaya Menu</v-toolbar-title><v-spacer></v-spacer
        ><span color="grey">{{ menus.length }} Menu Results</span>
      </v-toolbar>
      <v-row>
        <v-col cols="12" sm="6" v-for="(menus, i) in menus" :key="i">
          <v-card flat class="rounded-lg mx-5" color="grey lighten-4">
            <v-list-item three-line>
              <v-list-item-avatar rounded size="120" color="grey lighten-4">
                <v-img
                  v-bind:src="'http://localhost:3000/api/menus/img/' + menus.id"
                  max-height="110"
                  max-width="110"
                  contain
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-h5">
                  {{ menus.nama_menu }}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-1">{{
                  menus.deskripsi
                }}</v-list-item-subtitle>
                <strong class="mt-3">
                  Rp{{ menus.harga | formatAngka }}
                </strong>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="6" class="mt-1">
                  <strong class="ml-3">Mood</strong><br />
                  <v-item-group mandatory class="mt-n1">
                    <v-btn-toggle class="my-2 mx-2" rounded="xl">
                      <v-btn @click="cartObject.mood = 'hot'"> Hot </v-btn>

                      <v-btn @click="cartObject.mood = 'ice'"> Ice </v-btn>
                    </v-btn-toggle>
                  </v-item-group>
                </v-col>
                <v-col cols="12" sm="6" class="mt-1">
                  <strong class="ml-3">Size</strong><br />
                  <v-item-group mandatory class="mt-n1">
                    <v-btn-toggle class="my-2" rounded="xl">
                      <v-btn @click="cartObject.ukuran = 'Small'">
                        Small
                      </v-btn>

                      <v-btn @click="cartObject.ukuran = 'Medium'">
                        Medium
                      </v-btn>

                      <v-btn @click="cartObject.ukuran = 'Large'">
                        Large
                      </v-btn>
                    </v-btn-toggle>
                  </v-item-group>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="6" class="mt-1">
                  <strong class="ml-3">Sugar</strong><br />

                  <v-item-group mandatory class="mt-n1">
                    <v-btn-toggle class="my-2 mx-2" rounded="xl">
                      <v-btn @click="cartObject.sugar = '30%'"> 30% </v-btn>

                      <v-btn @click="cartObject.sugar = '50%'"> 50% </v-btn>

                      <v-btn @click="cartObject.sugar = '70%'"> 70% </v-btn>
                    </v-btn-toggle>
                  </v-item-group>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-actions>
              <v-btn
                color="#704232"
                block
                dark
                class="withoutupercase mb-2"
                @click="cart(menus.id, menus.nama_menu, 1, menus.harga)"
                >Add Billing</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Menu",
  head() {
    return {
      title: "payment - Kopi Jaya",
    };
  },
  data() {
    return {
      userDatas: null,
      kategori: null,

      search: {
        nama_menu: "",
        rules: [(v) => !!v || "Nama Menu is required"],
        valid: true,
        loading: false,
      },
      menus: [],
      cartObject: {
        nama_menu: "",
        qty: "",
        harga: "",
        ukuran: "",
        mood: "",
        sugar: "",
      },
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Form is valid");
    },
    async searchEnter(event) {
      if (event.keyCode == 13) {
        this.getmenusByname();
      }
    },
    async cart(id_menu, nama_menu, qty, harga) {
      if (sessionStorage.getItem("cartUser") == "") {
        var storedProductList = [];
      } else {
        var storedProductList = JSON.parse(sessionStorage.getItem("cartUser"));
      }

      let cartnew = {
        id: storedProductList.length + 1,
        id_menu: id_menu,
        nama_menu: nama_menu,
        qty: qty,
        harga: harga,
        dtl_menu: {
          ukuran: this.cartObject.ukuran,
          mood: this.cartObject.mood,
          sugar: this.cartObject.sugar,
        },
        total: harga * qty,
      };

      storedProductList.push(cartnew);
      sessionStorage.setItem("cartUser", JSON.stringify(storedProductList));
      location.reload();
    },
    async getmenusByname() {
      if (this.search.nama_menu == "") {
        this.getMenus();
      }
      this.search.loading = true;
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios
        .post(
          "menus/search/nama_menu",
          {
            nama_menu: this.search.nama_menu,
          },
          {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          }
        )
        .then((response) => {
          this.menus = response.data;
          this.search.loading = false;
          console.log(this.menus);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMenus() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      console.log("Ini Token MU" + tokens.token);
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
