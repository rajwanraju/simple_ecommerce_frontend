<template>
  <section class="product-showcase product-showcase-column">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <h6 class="title-with-border">
        <span class="section-title">{{ category.category.name }}</span>
        <span
          class="section-btn"
          @click="$router.push(`category/${category.category._id}?limit=12`)"
          >View All

          <v-icon medium color="blue darken-2">
            mdi-chevron-right
          </v-icon>
        </span>
      </h6>
    </div>
    <!-- <div class="row product-grid-view">
      <div
        class="
          col-6 col-xs-12 col-sm-4 col-md-4 col-lg-2 col-xl-2
          p-0
          pr-2
          product-grid-list
        "
        v-for="product in category.product"
        :key="product._id"
      >
        <AppProductCard :product="product" />
      </div>
    </div> -->

    <div class="row mbx-15">
      <div class="col-12 mt-4 p-0">
        <VueSlickCarousel v-bind="settings" v-if="category.product.length > 0">
          <div v-for="product in category.product" :key="product._id">
            <AppProductCard :product="product" />
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </section>
</template>

<script>
import AppProductCard from "./AppProductCard";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: ["category"],
  data: () => ({
    settings: {
      infinite: true,
      slidesToShow: 6,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
      responsive: [
        {
          breakpoint: 3840,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 2048,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1920,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1289,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    },
  }),
  components: {
    AppProductCard,
    VueSlickCarousel,
  },
};
</script>

<style lang="scss" scoped>
.mtx-50 {
  margin-top: 50px;
}
.title-with-border {
  border-bottom: 2px solid #008187;
  margin: 0 0 30px;
  margin-left: -15px;
}

.section-title {
  background: #008187;
  border-radius: 4px 4px 0 0;
  color: #ffffff;
  font-size: 14px;
  display: inline-block;
  line-height: 24px;
  text-transform: uppercase;
  padding: 13px 20px 7px 20px;
  position: relative;
  margin: 0;
  font-weight: 500;
}
@media all and (max-width: 480px) {

.section-title {
  padding: 13px 10px 7px 10px;
}

}

.product-showcase .product-filter-nav {
  display: flex;
  position: absolute;
  top: 13px;
  right: 5px;
  margin: 0;
  padding: 0;
}

.product-showcase .product-filter-nav > li.active,
.product-showcase .product-filter-nav > li:hover {
  color: #008187;
}

.product-showcase .product-filter-nav > li {
  display: inline-block;
  margin: 0 10px;
  text-transform: capitalize;
  line-height: 30px;
  cursor: pointer;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 122px;
}

.highlighted-txt {
  color: #008187;
}
.product-grid-list {
  //   border-right: 1px solid #ebebeb;
  margin-bottom: 30px;
}

.view-all-btn {
  border: 1px solid #008187;
  text-align: centen;
  padding: 6px 20px;
  font-size: 14px;
  font-weight: 500;
  outline: 0;
  background: #008187;
  color: #ffffff;
  transition: all 0.3s linear;
  text-transform: uppercase;
  border-radius: 5px;
  position: relative;
  float: right;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #ffffff;
    top: 0px;
    left: 0px;
    border-radius: 5px;
  }
}
// .product-grid-list:hover {
//   box-shadow: 2px 2px 10px #ebebeb;
// }
.section-btn {
  float: right;
  cursor: pointer;
  padding: 15px 0px;
}

.section-btn:hover {
  animation: shake 0.8s;
}

@keyframes section-btn {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(25px);
  }

  50% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
