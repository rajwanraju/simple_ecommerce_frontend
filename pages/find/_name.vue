<template>
  <section>
    {{this.$route.params.name}}
    <!-- {{data}} -->
    <v-container>
      <v-row>
        <v-col md="3" cols="12">
          <p class="title mb-5">Search Product</p>

          <v-breadcrumbs>
            <v-breadcrumbs-item class="jmcText" href="/">Home</v-breadcrumbs-item>
          </v-breadcrumbs>

          <v-text-field
            id="searchProduct"
            append-icon="search"
            label="Search Product's"
            solo
            @click:append="searchClicked"
            v-model="searchByName"
          ></v-text-field>

          <v-expansion-panels class="mt-5" accordion flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <p class="overline ma-0">Category</p>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox
                  @click="filter"
                  v-model="selectedCategory"
                  v-for="(item, i) in data.category"
                  :key="i"
                  :label="item.name"
                  :value="item._id"
                ></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <p class="overline ma-0">Brands</p>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox
                  @click="filter"
                  v-model="selectedBrand"
                  v-for="(item, i) in data.brand"
                  :key="i"
                  :label="item.name"
                  :value="item._id"
                ></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <p class="overline mt-5">Availability</p>
          <v-checkbox @click="filter" v-model="availabilityChecked" label="In Stock"></v-checkbox>
          <p class="overline mt-5">Discount</p>
          <v-checkbox @click="filter" v-model="discountChecked" label="Discount"></v-checkbox>
          <p class="overline mt-5">Price</p>
          <v-range-slider
            v-model="priceSlider"
            thumb-label="always"
            :max="data?data.price[1]:''"
            :min="data?data.price[0]:''"
            hide-details
            class="align-center mt-10"
          ></v-range-slider>
          <v-btn class="btn my-3" @click="filter" text>Get Products</v-btn>
        </v-col>
        <v-col md="9" cols="12">
          <v-card depressed flat :loading="cardLoading">
            <v-row v-if="data.product.length>0">
              <v-col cols="12" md="4" v-for="(item, i) in data.product" :key="i">
                <AppProductCard :data="item" />
              </v-col>
            </v-row>
          </v-card>
          <div class="nodata" v-if="data.product == 0">
            <p
              class="title pa-5"
            >No products match selected filters. Try adjusting filters to widen your search.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import AppProductCard from "../../components/Base/AppProductCard";
export default {
  layout: "landingpage",
  watch: {
    "$route.query": "$fetch"
  },
  async fetch({ route }) {
    console.log(this.$route);
  },
  components: {
    AppProductCard
  },
  data() {
    return {
      data: null,
      searchByName: null,
      selectedCategory: [],
      selectedBrand: [],
      cardLoading: false,

      availabilityChecked: false,
      discountChecked: false,

      priceSlider: []
    };
  },
  mounted() {
    this.searchByName = this.$route.params.name;
  },
  async asyncData({ params, $axios }) {
    // $axios.setToken(localStorage.getItem("token"));
    return $axios.$post("/product/find/" + params.name, {}).then(res => {
      return {
        data: res.data,
        priceSlider: res.data.price
      };
    });
  },
  methods: {
    searchClicked() {
      console.log(this.searchByName);
      this.$router.push("/find/" + this.searchByName);
    },
    filter() {
      console.log("F");
      this.cardLoading=true;
      let data = {};
      if (this.availabilityChecked) {
        data.availability = true;
      }
      if (this.discountChecked) {
        data.discount = true;
      }
      data.category = this.selectedCategory;
      data.brand = this.selectedBrand;
      data.lowPrice = this.priceSlider[0];
      data.highPrice = this.priceSlider[1];
      let url = "/product/find/" + this.$route.params.name;
      this.$axios.$post(url, data).then(res => {
        this.data = res.data;
        this.cardLoading=false;
        this.priceSlider = res.data.price;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nodata {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>