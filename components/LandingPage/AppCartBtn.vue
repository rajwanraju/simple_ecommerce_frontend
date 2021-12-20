<template>
  <section>
    <div class="cart" v-if="getCartCount > 0">
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          bottom
          left
          fab
          large
          @click="cartShow"
        >
          <v-badge color="success" :content="getCartCount">
            <v-icon>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
      </v-fab-transition>
    </div>
    <v-dialog v-model="getshowCart" width="800" height="600">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Shopping cart</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon dark @click="cartShow">close</v-icon>
      </v-toolbar>
      <v-card class="h-100 pa-5" min-height="300">
        <AppCartTable />

        <v-btn block color="primary" @click="confirm">Confirm Order</v-btn>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import AppCartTable from "../LandingPage/AppCartTable";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    AppCartTable,
  },
  data: () => ({
    cartView: false,
    // totalAmount: null
  }),
  computed: {
    ...mapGetters({
      getCartCount: "cart/getCartCount",
      getshowCart: "cart/getshowCart",
    }),
    // getTotal() {
    //   this.getCartItems.map(item => {
    //     this.totalAmount += item.price * item.quantity;
    //   });
    //   return this.totalAmount;
    // }
  },
  methods: {
    // ...mapActions({
    //   removeItemFromCart: "cart/removeFromCart"
    // }),
    confirm() {
      this.$router.push("/cart");
      this.cartView = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.cart {
  position: fixed;
  top: 85vh;
  right: 5vw;
}
</style>