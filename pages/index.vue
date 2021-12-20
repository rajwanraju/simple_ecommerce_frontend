<template>
  <main class="wrapper">
    <!-- START: SITE BANNER -->

    <!-- Start: Categories -->
    <section class="site-content">
      <!-- End: Shops -->
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
    <!-- End: Categories -->
  </main>
</template>
<script>
import AppProductCard from "@/components/LandingPage/ProductCard/AppProductCard";
// import ENVIRONMENT from "../assets/js/env";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  layout: "landingpage",
  components: {
    AppProductCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getProducts: "landingpage/getItemList",
    }),
  },
  created() {
    this.fetchAllSettings();
  },
  methods: {
    ...mapActions({
      fetchAllSettings: "landingpage/fetchItems",
    }),
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
