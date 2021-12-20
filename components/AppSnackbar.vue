<template>
  <v-snackbar v-model="show" :color="color" :timeout="3000" class="font-weight-bold">
    {{message}}
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      color:''
    }
  },
   created: function () {
    this.$store.watch(state => state.snackbar.snackMsg, () => {
      const msg = this.$store.state.snackbar.snackMsg
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snackbar.snackMsg
        this.color = this.$store.state.snackbar.snackColor
        this.$store.commit('snackbar/setSnack', '')
      }
    })
  },
}
</script>
