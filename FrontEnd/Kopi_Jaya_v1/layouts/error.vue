<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Login </NuxtLink>
    <NuxtLink :to="userRole"> Home </NuxtLink>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
      userRole: "",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  created() {
    this.getUserRole();
  },
  methods: {
    async getUserRole() {
      const userRole = JSON.parse(sessionStorage.getItem("userDatas"));
      this.userRole = "/" + userRole.user.role + "/home";
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
