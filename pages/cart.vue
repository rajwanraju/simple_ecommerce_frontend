<template>
<main>
  <section>
    <v-container>
      <v-row>
        <v-col sm="6" md="6" lg="6">
          <v-card outlined class="mb-4">
            <p class="headingTitle text-left" href="#sc">Shopping Cart</p>
            <AppCartTable />
          </v-card>
        </v-col>
        <v-col sm="6" md="6" lg="6">
          <v-card outlined>
            <AppCheckout  />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</main>
</template>
<script>
import AppCartTable from "../components/LandingPage/AppCartTable";
import AppCheckout from "../components/LandingPage/AppCheckout";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  layout: "landingpage",
  components: {
    AppCheckout,
    AppCartTable,
  },
  data() {
    return {
      promoCode: "",
      promoDiscount: null,
      total_cart:0
    };
  },
  computed: {
    isActive() {
      return !!this.promoCode.length;
    },

        cartTotal() {
       this.total_cart = this.$store.state.cart.cartList.length
      return this.$store.state.cart.cartList.length;
    },

  },
  mounted() {
      this.$store.commit("showCart", true);
     
  },
  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
      errorMessage: "snackbar/errorMessage",
    }),
    applyPromo() {
      this.$axios.setToken(localStorage.getItem("ctoken"));
      this.$axios.get(`/promo/verify/${this.promoCode}`).then((response) => {
        if (response?.data?.success) {
          this.successMessage(response?.data?.message);
          this.promoDiscount = response?.data?.data;
        } else {
          this.promoDiscount = response?.data?.data;
          this.errorMessage(response?.data?.message);
        }

        this.promoCode = "";
      });
    },
  },
    watch: {
      //   cartTotal: function () {
      // if (this.total_cart == 0) {


      //        Swal.fire({
      //       title: "No Item In Cart!",
      //       type: "error",
      //       confirmButtonColor: "#3085d6",
      //       confirmButtonText: "Ok!"
      //     }).then(result => {
      //       setTimeout(() => {
      //         this.$router.push("/");
      //       }, 1000);
        
      // }) 
      // }
      //   }
}
};
</script>
<style lang="scss" scoped>
</style>