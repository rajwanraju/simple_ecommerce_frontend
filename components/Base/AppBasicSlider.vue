<template>
  <section>
    <carousel
      :paginationEnabled="false"
      :perPageCustom="[
        [100, 1],
        [768, 2],
        [960, 4],
      ]"
      :touchDrag="true"
      :navigationEnabled="true"
      :navigationClickTargetSize="16"
    >
      <slide v-for="(item, i) in items" :key="i">
        <nuxt-link :to="`/${url}/${item._id}`">
          <v-card>
            <v-img
              :src="imageUrl+item.image"
              aspect-ratio="1"
              height="350"
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
            </v-img>
            <div class="title">{{ item.name }}</div>
          </v-card>
        </nuxt-link>
      </slide>
    </carousel>
  </section>
</template>
<script>
export default {
  props: ["url", "items"],
  components: {},

  data: () => ({
    imageUrl:null
  }),
     mounted() {
    this.imageUrl=process.env.base_image_url
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  background: transparent;
  box-shadow: 0px 5px 5px rgba(165, 167, 185, 0.05),
    0px 5px 5px rgba(165, 167, 185, 0.25) !important;
  border-radius: 5px !important;
  margin: 0.3em;

  // opacity: 0.75;
  .title {
    padding: 0.5em !important;
    text-align: center !important;
  }
  a {
    text-decoration: none;
  }
  &:hover {
    box-shadow: rgb(224, 224, 224) 0px 0px 0px 2px,
      rgb(224, 224, 224) 0px 0px 0px 2px !important;
    opacity: 1;
    cursor: pointer;
  }
}
</style>