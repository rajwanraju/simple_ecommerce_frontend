<template>
  <section>
    <v-card outlined class="pa-5">
      <p class="caption">Upload New Images</p>
      <v-row>
        <v-col cols="12" md="4">
          <v-file-input
            ref="imageUploader"
            label="Upload Image"
            v-model="galleryImageUpload"
            dense
            outlined
            append-icon="mdi-camera"
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn color="primary" block @click="uploadGallery">Upload</v-btn>
        </v-col>
      </v-row>
      <p class="caption">Product Images</p>
      <v-row>
        <v-col md="4" v-for="(item,i) in imagesList" :key="i">
          <v-card outlined class="text-end">
            <img :src="imageUrl+item" height="250"/>
            <v-btn class="ma-3" @click="remove(item,i)" outlined color="error">
              <v-icon>remove</v-icon>Remove
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  props: ["data"],
  components: {},
  data() {
    return {
      imageUrl: null,
      galleryImageUpload: null,
      image: null,
      imagesList: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.getAllImages();
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters({})
  },
  mounted() {
    this.imageUrl=process.env.base_image_url
  },
  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
      updateProductImage: "product/updateProductImage"
    }),
    uploadGallery() {
      this.createBase64Image(this.galleryImageUpload);
    },
    createBase64Image(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result;
        this.upload();
      };
    },
    clear() {
      this.galleryImageUpload = null;
    },
    upload() {
      const url = "/product/image/add";
      const payload = {
        _id: this.data,
        image: this.image
      };
      this.$axios.$post(url, payload).then(res => {
        this.imagesList = res.data;

        this.successMessage("Image Uploaded Successfully !");
        this.$refs.imageUploader.value = null;
      });
      this.clear();
    },
    remove(item, i) {
      const url = "/product/image/remove";
      const payload = {
        _id: this.data,
        image: item
      };
      this.$axios.$post(url, payload).then(res => {
        this.successMessage("Image Removed");
        this.imagesList.splice(i, 1);
      });
    },
    getAllImages() {
      const url = "/product/image";
      const payload = {
        _id: this.data
      };
      this.$axios.$post(url, payload).then(res => {
        this.imagesList = res.data;
        this.successMessage("All Gallery Images");
      });
    }
  }
};
</script>