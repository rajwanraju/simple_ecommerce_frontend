<template>
  <div class="single-product" :title="product.name">
    <div class="product-img">
     
      <router-link :to="`/product/${product.slug}`">
        <img
          :src="imageUrl+product.image"
         
          class="first-img img-fluid"
        >
          <div class="d-flex justify-center align-center fill-height"></div>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
      
      </router-link>
      <small class="out-of-stock" v-if="product.stock === 0"
        >Out of stock</small
      >
    </div>
    <div class="product-content text-center">
      <h2 class="text-center hp-text">
        <router-link :to="`/product/${product.slug}`">
          {{ product.name }}
        </router-link>
      </h2>

      <div class="product-price-wp">
        <div class="product-price text-left">
          <span class="new-price" 
            >৳{{ priceFormate(product.price) }}</span
          >
        
        </div>
      </div>

      <div class="product-button">
        <button @click="addCart(product)">
        Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {

  props: ["product"],
   data(){
    return{
      
    imageUrl: null,
    }
  },
   mounted() {
    this.imageUrl = process.env.imageBaseURL
  },
  methods: {
        ...mapActions({
      addToCart: "cart/addItemToCart",
      errorMessage: "snackbar/errorMessage",
    }),

    addCart(product){
      product['quantity'] = 1;
      this.addToCart(product);
      this.$store.commit("showCart", false);
    },
      priceFormate(price){
      return new Intl.NumberFormat( { maximumSignificantDigits: 3 }).format(Math.floor(price));


    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/productCard.scss";
</style>