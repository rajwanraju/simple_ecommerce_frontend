<template>
  <section>
    <template>

          <AppOnlineOrder />

    </template>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import AppNoDataCard from "@/components/Base/AppNoDataCard";
import AppOnlineOrder from "@/components/Dashboard/Order/AppOnlineOrder";
export default {
  components: {
    AppNoDataCard,
    AppOnlineOrder,
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