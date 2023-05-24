<template></template>
  
  <script>
export default {
  name: "auth",
  data() {
    return {};
  },
  created() {
    this.checkRole();
  },
  mounted() {
    this.checkRole();
  },
  methods: {
    async checkRole() {
      let userDatas = JSON.parse(sessionStorage.getItem("userDatas"));
      if (!userDatas) {
        this.$router.push("/login");
      }
      console.log(userDatas.user.role);
      let route = this.$route.path;
      console.log("Get Routes" + route);
      if (route.includes("admin") && userDatas.user.role !== "admin") {
        // this.$router.push("/" + userDatas.user.role + "/home");
        this.$nuxt.error({ statusCode: 404, message: "err message" });
      } else if (route.includes("kasir") && userDatas.user.role !== "kasir") {
        this.$nuxt.error({ statusCode: 404, message: "err message" });
      } else if (
        route.includes("manajer") &&
        userDatas.user.role !== "manajer"
      ) {
        this.$nuxt.error({ statusCode: 404, message: "err message" });
      }
    },
  },
};
</script>
      
    