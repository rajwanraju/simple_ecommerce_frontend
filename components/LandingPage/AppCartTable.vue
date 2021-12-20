<template>
  <div>
    <section>
      <div class="row">
        <div class="col-sm-2 col-2">
          <v-icon v-on:click="closeCart"> mdi-close-circle </v-icon>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-10 col-10">
          <i class="fa fa-shopping-bag fa-2x"></i
          ><span style="font-size: 24px; font-weight: 600; padding: 5px"
            >{{ getCartItems.length }} Items In Cart</span
          >
        </div>
      </div>
      <hr />
      <div class="col-12 card_class" v-if="getCartItems.length > 0">
        <div
          class="cart_item"
          v-for="(item, index) in getCartItems"
          :key="index"
        >
          <div class="cart_img">
            <nuxt-link
              :to="{ path: '/product/' + item.slug }"
              :title="item.name"
              class="product-image"
            >
              <img :src="imageUrl + item.image" :alt="item.name" width="80px" />
            </nuxt-link>
          </div>
          <div class="cart_info">
            <nuxt-link
              :to="{ path: '/product/' + item.slug }"
              class="hp-text"
              >{{ item.name }}</nuxt-link
            >

            <p>
              Qty: {{ item.quantity }} X
              <span> {{ priceFormate(item.price) }} </span>
              &nbsp; &nbsp;
            </p>
            <p>
              <span>
                <v-btn @click="decreaseItem(item)" small text><v-icon>mdi-minus</v-icon></v-btn>
              </span>
              <span :v-model="item.quantity"
                >{{ item.quantity }}

                <v-btn @click="increaseItem(item)" small text><v-icon>mdi-plus</v-icon></v-btn>
              </span>
            </p>
          </div>
          <div class="cart_remove">
            <v-icon @click="removeItemFromCart(item)" color="danger"
              >delete</v-icon
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  props: ["promoDiscount"],
  data: () => ({
    totalAmount: null,
    imageUrl: null,
    isCustomer: false,
    customer: null,
  }),

  mounted() {
    this.imageUrl = process.env.imageBaseURL;
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
    }
  },
  computed: {
    ...mapGetters({
      getCartItems: "cart/getCartList",
      getTotalBillAmount: "cart/getTotalBillAmount",
    }),
    getTotal() {
      this.getCartItems.map((item) => {
        this.totalAmount += parseInt(item.price) * parseInt(item.quantity);
      });
      return this.totalAmount;
    },

    getFinalBill() {
      if (this.promoDiscount) {
        return this.getTotalBillAmount - this.promoDiscount.discount;
      } else {
        return this.getTotalBillAmount;
      }
    },
  },
  methods: {
    ...mapActions({
      removeItemFromCart: "cart/removeFromCart",
      increaseItem: "cart/increaseItem",
      decreaseItem: "cart/decreaseItem",
    }),

    closeCart() {
      this.$store.commit("showCart", true);
    },

    priceFormate(price) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        Math.floor(price)
      );
    },
  },
};
</script>

<style scoped>
.card_class {
  min-height: 400px;
  max-height: 400px;
  overflow-y: scroll;
}
.mini_cart {
  position: fixed;
  min-width: 355px;
  height: 100%;
  padding: 18px 28px 33px;
  background: #fbfbfb;
  z-index: 999;
  right: 0;
  top: 0;
  transition: 0.5s;
  border-left: 1px solid #ccc;
  transform: translateX(100%);
}

.mini_cart.active {
  transform: translateX(0);
  transition: 0.5s;
}

@media only screen and (max-width: 767px) {
  .mini_cart {
    min-width: 300px;
    height: 100%;
    padding: 18px 18px 33px;
  }
}

.cart_img {
  width: 90px;
  margin-right: 10px;
  /* border: 1px solid #ebebeb; */
}

/* .cart_img:hover {
  border-color: #ea2227;
} */

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .cart_img {
    width: 70px;
  }
}

@media only screen and (max-width: 767px) {
  .cart_img {
    width: 70px;
  }
}

.cart_info {
  width: 63%;
}

.cart_info a {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: block;
  margin-bottom: 6px;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .cart_info a {
    font-size: 13px;
  }
}

@media only screen and (max-width: 767px) {
  .cart_info a {
    font-size: 13px;
  }
}

.cart_info a:hover {
  color: #ea2227;
}

.cart_info p {
  font-size: 12px;
}

.cart_info p span {
  font-weight: 600;
}

.cart_remove a {
  font-size: 15px;
  border: 1px solid #ebebeb;
  width: 20px;
  height: 20px;
  display: block;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
}

.cart_remove a:hover {
  background: #ea2227;
  border-color: #ea2227;
  color: #fff;
}

.cart_item {
  overflow: hidden;
  padding: 18px 0;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: space-between;
}

.mini_cart_table {
  padding: 23px 0;
}

.cart_total {
  display: flex;
  justify-content: space-between;
}

.cart_total span {
  font-size: 14px;
  font-weight: 400;
}

.cart_total span.price {
  font-weight: 700;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .cart_total span {
    font-size: 13px;
  }
}

@media only screen and (max-width: 767px) {
  .cart_total span {
    font-size: 13px;
  }
}

.cart_button:first-child {
  margin-bottom: 15px;
}

.cart_button a {
  text-transform: uppercase;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  background: #eef0f1;
  border: 1px solid #ebebeb;
  display: block;
  text-align: center;
  line-height: 20px;
  margin-bottom: 0;
  padding: 13px 0 11px;
}

.cart_button a:hover {
  background: #ea2227;
  border-color: #ea2227;
  color: #fff;
}

.cart_button a.active {
  background: #ea2227;
  border-color: #ea2227;
  color: #fff;
}
</style>