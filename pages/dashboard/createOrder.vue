<template>
  <section>
    <v-row>
      <v-col cols="12" md="6">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Search Product</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-5" min-height="300">
          <v-text-field
            v-model="searchSku"
            label="Search with Product Sku"
            outlined
          ></v-text-field>
          <v-btn color="primary" block large @click="searchProductBySku">
            <v-icon>find_in_page</v-icon>Add To Cart
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <AppCartTable />
        <v-btn color="primary" :loading="orderLoading" @click="confirmCheckout"
          >Checkout</v-btn
        >
      </v-col>
    </v-row>
  </section>
</template>
<script>
import AppCartTable from "../../components/LandingPage/AppCartTable";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    AppCartTable,
  },
  mounted() {},

  data() {
    return {
      searchSku: null,
      orderLoading: false,
      checkoutPanel: false,
    };
  },

  computed: {
    ...mapGetters({
      getCartListForOrder: "cart/getCartListForOrder",
    }),
  },
  created() {},
  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
      errorMessage: "snackbar/errorMessage",
      addToCart: "cart/addItemToCart",
      removeItemFromCart: "cart/removeFromCart",
    }),
    searchProductBySku() {
      const url = "/product/search/sku/" + this.searchSku;

      this.$axios.setToken(localStorage.getItem("token"));
      this.$axios.$get(url).then((res) => {
        if (res.data == null) {
          this.errorMessage("Product SKU Not found");
        } else {
          console.log(res);
          const item = {
            id: res.data._id,
            name: res.data.name,
            price: res.data.price,
            discount: this.getDiscountedAmount(
              res.data.price,
              res.data.discount
            ),
            vat: res.data.vat,
            quantity: 1,
            size: res.data.size,
          };
          console.log(item);
          this.addToCart(item);
        }
      });
    },
    getDiscountedAmount(price, discount) {
      if (discount.type == 1) {
        return discount.amount;
      }
      if (discount.type == 2) {
        return (price * discount.amount) / 100;
      }
    },
    confirmCheckout() {
      this.confirmCheckout = true;
      const data = {
        products: this.getCartListForOrder,
        _id: this.$route.query.id ? this.$route.query.id : null,
      };
      // console.log(data);

      const url = "/order/create/offline";
      const payload = data;

      this.$axios.$post(url, payload).then((res) => {
        if (res.success) {
          console.log(res);
          this.orderLoading = false;

          this.$router.push({ path: "/dashboard/order" });

          this.clearCart();
        }
      });
    },
  },
};
</script>