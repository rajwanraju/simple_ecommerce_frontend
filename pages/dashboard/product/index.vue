<template>
  <v-card>
    <v-tabs color="primary">
      <v-tab>Products</v-tab>

      <v-tab-item>
        <AppProduct />
      </v-tab-item>
  
    </v-tabs>
  </v-card>
</template>

<script>
import AppProduct from "@/components/Dashboard/Product/AppProduct";


export default {
  components: {
    AppProduct,
  },
  data: () => ({
    isAdmin: false,
    admin: null,
  }),
  mounted() {
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
    }
    
  }
};
</script>
<style lang="scss">
</style>
