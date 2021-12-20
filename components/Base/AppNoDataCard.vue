<template>
  <section>
    <v-card outlined class="text-center d-flex justify-center align-center mt-5" min-height="15em">
      <p class="title">{{text}}</p>
    </v-card>
  </section>
</template>
<script>
export default {
    props:['text']
}
</script>