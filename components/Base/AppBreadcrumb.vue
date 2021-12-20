<template>

    
      <div class="container">


     <v-breadcrumbs :items="links"  divider=">">
      <template v-slot:item="{ item }">
            <v-breadcrumbs-item  :href="item.url">{{item.title}}</v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

      </div>

</template>
<script>
export default {
  props: ["links"]
};
</script>
<style lang="scss" scoped>
</style>