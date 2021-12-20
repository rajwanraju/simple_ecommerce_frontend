<template>
  <main class="wrapper">
    <section class="site-content">
      <v-container>
        <v-row align="center">
          <v-col cols="3" offset="6">
            <v-select
              v-model="select"
              :items="items"
              item-text="state"
              item-value="abbr"
              label="Short Products"
              persistent-hint
              return-object
              single-line
              @change="productShorting()"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <div class="container">
        <v-row no-gutters>
          <v-col
            v-for="(product, index) in getProducts"
            :key="index"
            cols="12"
            sm="4"
            md="3"
            lg="2"
          >
           
            <AppProductCard :product="product" />
          </v-col>
        </v-row>
      </div>
    </section>
  </main>
</template>
<script>
import AppProductCard from "@/components/LandingPage/ProductCard/AppProductCard";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  layout: "landingpage",
  components: {
    AppProductCard,
  },
  data() {
    return {
      getProducts: null,
      select: { state: "Short By Position", abbr: "Position" },
      items: [
        { state: "Short By Position", abbr: "Position" },
        { state: "Price Min To Max", abbr: "mintomax" },
        { state: "Price Max To Min", abbr: "maxtomin" },
        { state: "Short By Name ASC", abbr: "nameASC" },
        { state: "Short By Name DESC", abbr: "nameDESC" },
      ],
    };
  },

  created() {
    this.fetchAllProducts();
  },
  methods: {
    fetchAllProducts() {
      let url = "/products";
      this.$axios
        .get(url)
        .then((res) => {
          this.getProducts = res.data.data;
        })
        .catch((err) => {});
    },

    productShorting() {
      let products = this.getProducts;
      if (this.select.abbr == "nameASC") {
        products.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        this.getProducts = products;
      } else if (this.select.abbr == "nameDESC") {
        products.sort(function(a, b) {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });

        this.getProducts = products;
      } else if (this.select.abbr == "Position") {
        products.sort(function(a, b) {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });

        this.getProducts = products;
      } else if (this.select.abbr == "mintomax") {
        products.sort(function(a, b) {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          return 0;
        });

        this.getProducts = products;
      } else if (this.select.abbr == "maxtomin") {
        products.sort(function(a, b) {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });

        this.getProducts = products;
      }
    },
  },
};
</script>

<style>
.site-banner {
  background-color: #f7f8fa;
  box-shadow: 0 1px 1px #ebebeb inset;
}

.category-navigation {
  width: 100%;
  padding: 0px;
  height: 490px;
  overflow-x: hidden;
  overflow-y: hidden;
  background: #f7f8fa;
  margin-top: -28px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 1px 0px 2px #f1f1f1;
}

.category-navigation .category-navigation-menu {
  position: relative;
  z-index: 10;
}

.category-navigation .category-navigation-menu ul {
  padding: 0;
  margin: 0;
}
.category-navigation .category-navigation-menu > li:hover {
  background-color: #008187;
}
.category-navigation .category-navigation-menu > li {
  display: block;
  padding: 0 15px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ebebeb;
}

.category-navigation .category-navigation-menu > li:last-child {
  border-bottom: 0px !important;
}

.category-navigation .category-navigation-menu > li > a:after {
  content: "\203a";
  position: absolute;
  right: 20px;
  top: 14px;
}
.category-navigation .category-navigation-menu > li > a {
  display: block;
  color: #333333;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
}

.category-navigation .category-navigation-menu > li > a:hover {
  color: #fff !important;

  font-weight: 600;
}

@media only screen and (max-width: 480px) {
  .home-banner {
    padding: 0 !important;
  }
}

.category-navigation .category-navigation-menu > li:not(:last-child):after {
  border-bottom: none !important;
}
</style>
