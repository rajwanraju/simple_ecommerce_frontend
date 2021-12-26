<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Add Product</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- {{getFormValidation}} -->
      <v-toolbar-items>
        <v-btn
          success
          color="primary"
          :disabled="getFormValidation"
          text
          @click="productStore"
          >Save</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <!-- {{valid}} -->
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-card outlined class="pa-3">
                <p class="caption mb-5">Basic Info</p>

                <span class="overline">Name *</span>
                <v-text-field
                  :rules="requiredRules"
                  outlined
                  dense
                  v-model="product.name"
                  label="Name"
                ></v-text-field>

                <span class="overline">Description</span>
                <vue-editor v-model="product.description"></vue-editor>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card outlined class="pa-3">
                <v-row>
                  <v-col>
                    <span class="overline">Price</span>
                    <v-text-field
                      outlined
                      dense
                      v-model="product.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <span class="overline">Quantity</span>
                    <v-text-field
                      outlined
                      dense
                      v-model="product.quantity"
                      label="quantity"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card outlined class="pa-3">
                <p class="caption mb-5">Product Thumbnail *</p>

                <v-card outlined>
                  <img
                    v-if="product.thumbnail != null"
                    :src="imageUrl + '/storage/products/'+product.thumbnail"
                    class="img-fluid"
                  />
                </v-card>
                <v-btn
                  v-if="!product.thumbnail"
                  color="primary"
                  block
                  @click="imageEditorModal = true"
                >
                  <v-icon>camera</v-icon>Add Product Image
                </v-btn>
                <v-btn v-if="product.thumbnail" block @click="removeImage">
                  <v-icon>remove_circle_outline</v-icon>Remove Image
                </v-btn>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-dialog v-model="imageEditorModal" persistent max-width="1024">
              <v-toolbar dark color="primary">
                <v-icon>camera</v-icon>Image Editor
              </v-toolbar>
              <v-card>
                <client-only>
                  <div class="image-wpr d-flex justify-center py-8">
                    <v-image-input
                      ref="imageEditor"
                      v-model="image"
                      :image-quality="0.95"
                      overlayPadding="10px"
                      :imageHeight="800"
                      :imageWidth="800"
                      image-format="jpg"
                      uploadIcon="add_a_photo"
                      :hide-actions="true"
                    />
                  </div>
                </client-only>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="clearImage"
                    >Close</v-btn
                  >
                  <v-btn @click="uploadImage" color="primary">
                    <v-icon>save</v-icon>Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import VImageInput from "vuetify-image-input";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    VImageInput,
  },

  data: () => ({
    isAdmin: false,
    admin: null,
    imageUrl: null,
    image: null,
    imageEditorModal: false,
    imageEditorData: null,
    valid: false,
    requiredRules: [(v) => !!v || "Name is required"],
    product: {
      name: null,
      quantity: 0,
      description: null,
      price: null,
      thumbnail: null,
    },
  }),
  computed: {
    getFormValidation() {
      if (this.valid && this.product.thumbnail != null) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
       this.imageUrl = process.env.imageBaseURL
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
    }
  },
  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
    }),
    productStore() {
      let url = "products ";
         const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      this.$axios.setToken(localStorage.getItem("token"));

      const data = {
          name: this.product.name,
          detail: this.product.description,
          quantity: this.product.quantity,
          image: this.product.thumbnail,
          price: this.product.price,
        };

      this.$axios
        .$post(url, data,config)
        .then((res) => {
           this.successMessage("product Added!");
           setTimeout(() => {
             window.location.reload(true)
             
           }, 2000);
        })
        .catch((err) => {
          this.dialog = true;
          setTimeout(() => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              timer: 5000,
              text: err.response.data.message,
            });
          }, 500);
        });
    },
    uploadImage() {
            const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const url = "/storeImage";
      const payload = {
        image: this.image,
      };
      this.$axios.$post(url, payload,config).then((res) => {
      
        this.product.thumbnail = res.data;
        this.imageEditorModal = false;
        this.$refs.imageEditor.clear();
      });
     
    },
    remove(item, i) {
      const url = "/product/image/remove";
      const payload = {
        _id: this.data,
        image: item,
      };
      this.$axios.$post(url, payload).then((res) => {
        this.successMessage("Image Removed");
  
      });
    },

    removeImage() {
      this.product.thumbnail = null;
    },
    clearImage() {
      this.imageEditorModal = false;
      this.$refs.imageEditor.clear();
    },
  },
};
</script>
<style lang="scss"></style>
