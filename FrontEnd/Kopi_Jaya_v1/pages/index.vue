<template>
  <v-app>
    <v-row style="height: 100vh" class="rowsaya"> </v-row>
  </v-app>
</template>

<script>
export default {
  name: "index",
  created() {
    this.$router.push("/login");
  },
  methods: {},
};
</script>
<style>
.rowsaya {
  background-image: url("https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/5c3d5f54-b6a8-4ef7-923d-539591b04a46_restaurant-image_1595833883341.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
