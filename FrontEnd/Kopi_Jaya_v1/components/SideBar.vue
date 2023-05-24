<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="white"
      mini-variant
      mini-variant-width="90"
    >
      <v-avatar class="d-block text-center mx-auto mt-4" size="40">
        <v-icon color="#704232">mdi mdi-coffee</v-icon>
      </v-avatar>
      <v-list flat class="mt-4">
        <v-list-item-group v-model="selectedItem">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            active-class="border"
            :ripple="false"
            :to="'/' + role + item.to"
          >
            <v-list-item-content>
              <v-icon v-text="item.icon"></v-icon>
              <v-list-item-subtitle
                align="center"
                v-text="item.text"
                class="mt-3 caption"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div
        style="
          position: absolute;
          bottom: 20px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
        "
        @click="logout()"
      >
        <v-icon>mdi mdi-logout</v-icon><br /><span class="caption">Logout</span>
      </div>
    </v-navigation-drawer>
    <v-snackbar v-model="snackbar.snackbar">
      {{ snackbar.text }}
      <template>
        <v-btn
          style="margin-left: 3px"
          color="brown darken-2"
          variant="text"
          @click="logout()"
        >
          Relogin
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      tokens: [],
      userDatas: [],
      selectedItem: 0,
      drawer: null,
      role: "",
      snackbar: {
        snackbar: false,
        text: "Token Sudah Kedaluwarsa Silahkan Login Ulang!",
      },
      sideBar: {
        admins: [
          { icon: "mdi mdi-home", text: "Home", to: "/home" },
          // { icon: "mdi mdi-menu", text: "Payment", to: "/payment" },
          { icon: "mdi mdi-table-chair", text: "Table", to: "/table" },
          { icon: "mdi mdi-book", text: "Menu", to: "/menus" },
          { icon: "mdi mdi-account", text: "users", to: "/users" },
          { icon: "mdi mdi-history", text: "History", to: "/history" },
        ],
        manajer: [
          { icon: "mdi mdi-home", text: "Home", to: "/home" },
          { icon: "mdi mdi-book", text: "Menu", to: "/menu" },
          { icon: "mdi mdi-history", text: "History", to: "/history" },
        ],
        kasir: [
          { icon: "mdi mdi-home", text: "Home", to: "/home" },
          { icon: "mdi mdi-menu", text: "Payment", to: "/payment" },
          { icon: "mdi mdi-table-chair", text: "Table", to: "/table" },
          { icon: "mdi mdi-history", text: "History", to: "/history" },
        ],
      },
      items: [],
      title: "Kopi Jaya",
    };
  },
  created() {
    this.getTokens();
    this.checkRole();
    this.checkTokenValid();
  },
  methods: {
    checkTokenValid() {
      this.$axios
        .post("auth/checkToken", {
          headers: {
            Authorization: "Bearer " + this.tokens.token,
          },
        })
        .then((response) => {
          console.log("Pesan " + response.data.message);
          console.log("Token Valid = " + response.data.token);
          if (response.data.token == false) {
            this.snackbar.snackbar = true;
          } else {
            this.snackbar.snackbar = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async checkRole() {
      let userDatas = JSON.parse(sessionStorage.getItem("userDatas"));
      console.log(userDatas.user.role);
      if (userDatas.user.role == "admin") {
        this.role = "admin";
        this.items = this.sideBar.admins;
      } else if (userDatas.user.role == "manajer") {
        this.role = "manajer";
        this.items = this.sideBar.manajer;
      } else if (userDatas.user.role == "kasir") {
        this.role = "kasir";
        this.items = this.sideBar.kasir;
      }
    },

    async getTokens() {
      let tokens = JSON.parse(sessionStorage.getItem("token"));
      this.$axios.setToken(tokens.token, "Bearer");
      this.tokens = JSON.parse(sessionStorage.getItem("token"));
    },
    async logout() {
      this.$axios
        .post("auth/logout", {
          headers: {
            Authorization: "Bearer " + this.tokens.token,
          },
        })
        .then((response) => {
          this.$axios.setToken(null, "Bearer");
          sessionStorage.removeItem("userDatas");
          sessionStorage.removeItem("token");
          console.log(response.data.message);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
};
</script>
    
  <style>
.border {
  margin-left: 8px;
  margin-right: 8px;
  background: #704232;
  border-radius: 20px;
  text-decoration: none;
}
.v-list-item-group .v-list-item--active {
  color: white !important;
}
.theme--light.v-list-item--active .v-list-item__subtitle,
.theme--light.v-list-item .v-list-item__action-text {
  color: white !important;
}
</style>
  