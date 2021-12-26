<template>
  <section>
    <template>

          <AppDeliveriedOrder />

    </template>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import AppNoDataCard from "@/components/Base/AppNoDataCard";
import AppDeliveriedOrder from "@/components/Dashboard/Order/AppDeliveriedOrder";
export default {
  components: {
    AppNoDataCard,
    AppDeliveriedOrder,
  },
  data() {
    return {
      onlineOrderLoader: false,

      isAdmin: false,
      admin: null,

      isVendor: false,
      vendor: null
    };
  },

  mounted() {
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
    }
    
  },

  methods: {}
};
</script>