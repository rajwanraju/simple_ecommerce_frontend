<template>
  <v-app>
    <AppHeader />
    <nuxt />
    <AppSnackbar />
    <AppAbout />
  </v-app>
</template>

<script>
import AppSnackbar from "@/components/AppSnackbar";
import AppAbout from "@/components/LandingPage/Includes/AppAbout";
import AppHeader from "@/components/LandingPage/Includes/AppHeader";
export default {
  components: {
    AppSnackbar,
    AppAbout,
    AppHeader,
  },

  mounted() {
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = localStorage.customer;
    }
  },

  data() {
    return {
      isCustomer: false,
      customer: null,
      items: [
        {
          src: "bg.jpg",
          title: "Estore",
          content: "YOUR TRUSTED ONLINE MARKET PLACE",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
details, main {
    display: block;
    background: #F5F5F5;
    padding-top: 160px;
    min-height: 600px;
}
.slick-prev:before, .slick-next:before{
  color:#000 !important;
}

.slick-prev, .slick-next{
  top: 47%;
}
.slick-prev {
    left: 25px;
    z-index: 90 !important;
}

.slick-next {
    right: 25px;
}

@media (max-width: 480px) {
.slick-prev, .slick-next{
  top: 47% !important;
}
.slick-prev {
    left: -10px !important;
    z-index: 90 !important;
}

.slick-next {
    right: -10px !important;
}

}
  
</style>