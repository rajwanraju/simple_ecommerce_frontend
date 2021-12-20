<template>
  <div>
    <img
      @click="$router.push('/')"
      class="logo"
      :src="`${getLogo}`"
      height="60"
      alt
    />
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import env from "../../assets/js/env";

export default {
  data: () => ({
    env: env,
  }),
  computed: {
    ...mapGetters({
      getSiteInfo: "landingpage/getSiteInfo",
    }),
    getLogo() {
      if (this.getSiteInfo) {
        return this.env.imageBaseUrl + this.getSiteInfo.logo;
      }
    },
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

<style lang="scss">
.logo {
  width: auto !important;
  cursor: pointer;
}
</style>