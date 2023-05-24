<template>
  <v-app>
    <v-main>
      <v-col cols="12" sm="12" md="12" lg="12">
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
                <v-card-title>Login - Kopi Jaya</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="userLogin.email"
                      label="Email"
                      outlined
                      dense
                      type="email"
                    ></v-text-field>
                    <v-text-field
                      v-model="userLogin.password"
                      label="Password"
                      outlined
                      dense
                      type="text"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="login" style="width: 100px"
                    >Login</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-container>
          </v-col>
          <v-dialog v-model="dialog" width="auto">
            <v-card>
              <v-card-text>
                {{ userLogin.returnDatas }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  head() {
    return {
      title: "Login - Kopi Jaya",
    };
  },
  data() {
    return {
      dialog: false,
      url: "auth/login",
      userLogin: {
        email: "",
        password: "",
        returnDatas: null,
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      // Fetch with axios from url method post
      this.$axios
        .post(this.url, {
          email: this.userLogin.email,
          password: this.userLogin.password,
        })
        .then((response) => {
          // this.userLogin.returnDatas = response.data;
          // this.dialog = true;
          sessionStorage.userDatas = JSON.stringify(response.data);
          sessionStorage.token = JSON.stringify(response.data.data);
          let tokens = JSON.parse(sessionStorage.getItem("token"));
          console.log("Ini Adalah Tokennya " + tokens.token);
          this.$axios.setToken(tokens.token, "Bearer");
          if (response.data.user.role == "admin") {
            this.$router.push("/admin/home");
          } else if (response.data.user.role == "kasir") {
            this.$router.push("/kasir/home");
          } else if (response.data.user.role == "manajer") {
            this.$router.push("/manajer/home");
          }
        })
        .catch((error) => {
          this.userLogin.returnDatas =
            "Pastikan Email dan Password Benar | Error Code : " +
            error.response.status;
          this.dialog = true;
        });
    },
  },
};
</script>
<style>
</style>
