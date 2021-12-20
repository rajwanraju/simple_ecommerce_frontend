<template>
  <v-app>
    <nuxt />
    <AppSnackbar />
  </v-app>
</template>

<script>
import AppSnackbar from "../components/AppSnackbar";
export default {
  components: {
    AppSnackbar,
  },

  data() {
    return {};
  },
};
</script>
<style scoped>
.v-application .primary{
  background-color: #008187 !important;
  border-color: #008187 !important;
}
.slick-prev:before, .slick-next:before{
  color:#000 !important;
}
</style>
