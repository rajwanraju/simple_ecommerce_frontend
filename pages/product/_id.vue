<template>
  <main class="wrapper">
    <v-container class="pa-4 text-center" id="pd">
      <v-row>
        <v-col md="12" cols="12">
          <section class="pb-5 pt-5">
            <v-breadcrumbs>
              <v-breadcrumbs-item class="jmcText" href="/"
                >Home</v-breadcrumbs-item
              >
              <v-breadcrumbs-item>
                /
                {{ productDetails.name }}
              </v-breadcrumbs-item>
            </v-breadcrumbs>
          </section>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <client-only>
            <pic-zoom :url="mainImage" :scale="1.75" :scroll="true"></pic-zoom>
          </client-only>

          <vueper-slides
            fixed-height="150px"
            class="py-3 no-shadow"
            :visible-slides="3"
            slide-multiple
            :gap="1"
            :slide-ratio="1 / 4"
            :dragging-distance="100"
          >
            <vueper-slide
              v-for="(item, i) in productDetails.images"
              :key="i"
              :image="`http://localhost:9001${item}`"
              @click.native="updateMainImage(item)"
            />
          </vueper-slides>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-left">
            <h2>{{ productDetails.name }}</h2>

            <p class="my-2">৳ {{ priceFormate(productDetails.price) }}</p>

            <div class="d-flex align-center">
              <v-chip
                v-if="productDetails.stock == 0"
                label
                color="error"
                outlined
                >Out of Stock</v-chip
              >
              <template v-if="productDetails.stock !== 0">
                <span class="caption">In stock :</span>
                <v-chip class="ma-2" color="primary" label>
                  {{ productDetails.stock }} </v-chip
                >available
              </template>
            </div>

            <div class="d-flex align-baseline" style="max-width: 10em">
              <span class="caption pr-5">Quantity :</span>
              <v-text-field
                type="number"
                style="width: 1.5em"
                v-model="quantity"
                :max="productDetails.stock"
                outlined
                dense
              ></v-text-field>
            </div>

            <v-row>
              <v-col cols="12" md="6">
                <v-btn
                  block
                  class="mb-5"
                  color="primary"
                  @click="setItemTocart(productDetails)"
                >
                  <v-icon>shopping_cart</v-icon>Add To Bag
                </v-btn>
              </v-col>
            </v-row>

            <p class="caption mt-2">Product Details :</p>
            <div v-html="productDetails.detail"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import PicZoom from "@/components/LandingPage/product/zoom";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  layout: "landingpage",
  components: {
    PicZoom,
    VueperSlides,
    VueperSlide,
  },

  data() {
    return {
      isCustomer: false,
      customer: null,
      mainImage: null,
      productDetails: null,
      selectedSizeStock: null,
      imageUrl: null,
      thaddedtoImages: false,
      quantity: 1,
      selectedSize: [],
      similerProducts: [],
    };
  },
  async asyncData({ params, $axios }) {
    return $axios.$get(`/products/${params.id}`).then((res) => {
      return {
        productDetails: res.data,
      };
    });
  },

  created() {
    console.log(this.productDetails);
    this.mainImage = "http://localhost:9001" + this.productDetails.image;
  },
  mounted() {
    this.imageUrl = process.env.imageBaseURL
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
    }
  },
  methods: {
    ...mapActions({
      addToCart: "cart/addItemToCart",
      errorMessage: "snackbar/errorMessage",
    }),

    priceFormate(price) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        Math.round(price)
      );
    },

    setItemTocart(item) {
       item['quantity'] = this.quantity;  
         this.addToCart(item);
      this.$store.commit("showCart", false);
    },

    updateMainImage(item) {
      this.mainImage = this.imageUrl + item;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-breadcrumbs {
  padding: 0 !important;
}
.caption {
  font-weight: bold;
}
.jmcText {
  a {
    color: #999 !important;
  }
}
.price {
  font-size: 2em;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
  border-radius: 15px !important;
  background: transparent;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.v-card {
  // background-image: linear-gradient(45deg, #ff6a88 0%, #ffcc70 100%);
  &:hover {
    cursor: pointer;
  }
}
</style>
