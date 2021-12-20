<template>
  <section>
    <v-container>
      <p class="headingTitle">{{ title }}</p>
      <!-- <client-only>
        <carousel
          :paginationEnabled="false"
          :perPageCustom="[
            [100, 2],
            [768, 4],
            [1024, 6],
          ]"
          :touchDrag="true"
          :navigationEnabled="true"
          :navigationClickTargetSize="16"
        >
          <slide v-for="(item, i) in items" :key="i" class="mr-2 w-164">
            <AppProductCard :product="item" />
          </slide>
        </carousel>
      </client-only> -->

<VueSlickCarousel v-bind="settings" v-if="items.length > 0">

      <div class="p-2" v-for="(item, i) in items" :key="i" >
            <AppProductCard :product="item" />
          </div>

</VueSlickCarousel>



    </v-container>
  </section>
</template>
<script>
import AppProductCard from "../LandingPage/ProductCard/AppProductCard.vue";
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    AppProductCard,
    VueSlickCarousel 
  },
  props: ["title", "items"],

  data: () => ({
    name: null,
    defaultProduct: {
      _id: null,
      brand: null,
      currentStock: null,
      discount: null,
      name: null,
      price: null,
      thumbnail: null,
    },
    settings:{
  "dots": false,
  "infinite": true,
  "speed": 500,
  'arrow':true,
  "slidesToShow": 5,
  "slidesToScroll": 1,
  "initialSlide": 0,
  "responsive": [
     {
      "breakpoint": 1920,
      "settings": {
        "slidesToShow": 5,
        "slidesToScroll": 1,
        "infinite": true,

      }
    },
    {
      "breakpoint": 1024,
      "settings": {
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "infinite": true,
        
      }
    },
    {
      "breakpoint": 600,
      "settings": {
        "slidesToShow": 3,
        "slidesToScroll": 1,
        "initialSlide": 3
      }
    },
    {
      "breakpoint": 480,
      "settings": {
        "slidesToShow": 2,
        "slidesToScroll": 2
      }
    }
  ]
},
  }),
  methods: {},
};
</script>
<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  border-radius: 15px !important;
  background: transparent;
  opacity: 0.75;
  a {
    text-decoration: none;
  }
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.w-164 {
  max-width: 164px !important;
}

</style>