<template>
  <section>
    
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  props: ["id","thumbnail", "name", "brand", "price"],

  data: function () {
  return {
    brandName: this.brand,
    // id:this.id
  }
},
  computed:{
   
  },
  methods: {
    ...mapActions({
      
    }),
  }
};
</script>
<style lang="scss" scoped>

</style>