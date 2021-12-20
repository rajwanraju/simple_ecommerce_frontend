<template>
  <section>
    <!-- {{data}} -->
    <v-card class="text-center ma-1 productCard">
      <nuxt-link :to="`/product/${data.slug}`">
        <div class="image-upper">
          <v-img
            :src="`https://testapi.jmc.shopping/${image}`"
            class="image"
            @mouseover="changeImage"
            @mouseout="resetImage"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="discount-tag-line" v-if="data.discount.amount">
            <img :src="require(`@/assets/images/discount-bg.png`)" alt="" />
            <!-- {{ data.discount.amount
            }}{{ data.discount.type === 1 ? " tk" : " %" }} off -->
          </div>
        </div>

        <v-card class="px-5 py-4">
          <!-- <div class="h3 ma-0 name">{{ data.name }}</div> -->
          <div class="h3 ma-0">{{ data.name }}</div>
          <p class="caption ma-0">Sku {{ data.sku }}</p>

          <!-- <p class="subtitle-2 mb-2" v-if="data.discount.type === 0">৳ {{data.price}}</p>
          <p class="subtitle-2 mb-2" v-if="data.discount.type === 1">
            <strike>৳ {{data.price}}</strike>
            <b>৳ {{getDiscountedPrice}}</b>
          </p>-->
          <p class="subtitle-2 mb-2">
            <span>
              <strike v-if="getDiscountAmount > 0">৳ {{ data.price }}</strike>
              <span v-if="getDiscountAmount == 0">৳ {{ data.price }}</span>
            </span>
            <span v-if="getDiscountAmount > 0">
              <b>৳ {{ getDiscountedPrice }}</b>
            </span>
            <br />
            <span v-if="getVatAmount > 0" class="caption"
              >Vat Applicable ৳ {{ getVatAmount }}</span
            >
          </p>
          <!-- <p class="caption"> Discount - {{data.discount.amount}} - {{  ? "TK":'%'}}</p> -->

          <v-btn
            v-if="data.currentStock != 0"
            small
            depressed
            @click="$router.push(`/product/${data.slug}`)"
            >Buy Now</v-btn
          >
          <v-btn v-if="data.currentStock === 0" small depressed color="error"
            >Sold Out</v-btn
          >
          <v-btn v-if="getAffiliateUser" small depressed v-clipboard="getUrl"
            >Copy</v-btn
          >
        </v-card>
      </nuxt-link>
    </v-card>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  props: ["data"],

  data: function () {
    return {
      image: this.data.thumbnail,
    };
  },
  computed: {
    getVatAmount() {
      if (this.data.vat) {
        return (this.data.price * this.data.vat) / 100;
      } else {
        return 0;
      }
    },
    getDiscountedPrice() {
      if (this.data.discount.type == 1) {
        return this.data.price - this.data.discount.amount;
      } else if (this.data.discount.type == 2) {
        let amount = (this.data.price * this.data.discount.amount) / 100;
        return this.data.price - amount;
      } else {
        return 0;
      }
    },

    getUrl() {
      return `${this.getBaseUrl}/product/${this.data.slug}?affiliate=${this.getAffiliateUser}`;
    },
    getDiscountAmount() {
      if (this.data.discount.type == 1) {
        return this.data.discount.amount;
      } else if (this.data.discount.type == 2) {
        return (this.data.price * this.data.discount.amount) / 100;
      } else {
        return 0;
      }
    },

    getAffiliateUser() {
      if (localStorage.getItem("customer")) {
        return JSON.parse(localStorage.getItem("customer")).username;
      } else {
        return null;
      }
    },

    getBaseUrl() {
      return window.location.origin;
    },
  },
  methods: {
    changeImage() {
      this.image = this.data.images[0];
    },
    resetImage() {
      this.image = this.data.thumbnail;
    },
  },
};
</script>
<style lang="scss" scoped>
.image-upper {
  position: relative;

  .discount-tag-line {
    position: absolute;
    top: -29px;
    left: -20px;
    width: 98px;
    font-size: 12px;
    & > img {
      max-width: 100%;
    }
  }
}
.productCard {
  box-shadow: 0px 5px 5px rgba(165, 167, 185, 0.05),
    0px 5px 5px rgba(165, 167, 185, 0.25) !important;
  border-radius: 5px !important;
  background-color: #ffffff !important;
  &:hover {
    // box-shadow: rgb(224, 224, 224) 0px 0px 0px 2px,
    //   rgb(224, 224, 224) 0px 0px 0px 2px !important;
    cursor: pointer;
  }
}
.image {
  width: 100%;
  min-height: 360px;
  max-height: 360px;
  @media screen and (max-width: 600px) {
    min-height: 210px;
    max-height: 210px;
  }
}
.name {
  min-height: 1.5em;
  max-height: 1.5em;
  overflow-y: hidden;
}
</style>