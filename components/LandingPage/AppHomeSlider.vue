<template>
  <section class="w-full" style="margin-bottom:10px">
    <div class="fvh">
      <vueper-slides autoplay :fixed-height="height" lazy>
        <vueper-slide
          v-for="(item, i) in getSiteInfo ? getSiteInfo.sliders : []"
          :key="i"
          :image="imageUrl + item.image"
          :link="item.redirectUrl"
        />
      </vueper-slides>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      imageUrl: null,
      height: "460px",
    };
  },
  mounted() {
    this.imageUrl = process.env.base_image_url;
    // if (process.browser) {
    if (window.innerWidth < 660) {
      this.height = "160px";
    }
  },
  computed: {
    ...mapGetters({
      getSiteInfo: "landingpage/getSiteInfo",
    }),
  },
};
</script>

<style lang="scss">
.hooper {
  height: auto !important;
}
.sliderContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  // background: rgba(98, 98, 98, 0.66);
  padding: 0 25%;
  height: 100%;
  img {
    height: 10em;
    border-radius: 25em;
  }
  .titleC {
    font-family: "Lobster", cursive;
    color: rgba(255, 233, 94, 0.9);
    font-weight: 700;
    line-height: 1.05em;
    font-size: 5em;
    margin: 0.5em 0;
  }
}

.text {
  font-size: 1em;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  .fvh {
    margin-left: 5px;
    margin-right: 5px;
    height: 145px !important;
  }

  .sliderContent {
    padding: 1em;
  }
  .title {
    font-size: 2em;
  }
  .text {
    font-size: medium;
  }
}

.scrollBtn {
  cursor: pointer;
}
.chevron {
  position: absolute;
  width: 28px;
  height: 8px;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: move 3s ease-out infinite;
}

.chevron:first-child {
  animation: move 3s ease-out 1s infinite;
}

.chevron:nth-child(2) {
  animation: move 3s ease-out 2s infinite;
}

.chevron:before,
.chevron:after {
  content: " ";
  position: absolute;
  top: 0;
  height: 100%;
  width: 51%;
  background: #fff;
}
.fvh {
  margin-left: 5px;
  margin-right: 5px;
  height: 373px;
}
.chevron:before {
  left: 0;
  transform: skew(0deg, 30deg);
}

.chevron:after {
  right: 0;
  width: 50%;
  transform: skew(0deg, -30deg);
}

@keyframes move {
  25% {
    opacity: 1;
  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
}
.v-carousel__controls {
  bottom: 20px !important;
}

.v-image__image--preload {
  filter: blur(0px) !important;
}
</style>
