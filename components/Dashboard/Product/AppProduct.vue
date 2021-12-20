<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="getPresetList"
      :search="search"
      class="elevation-1"
    >

     <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All Products</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
               @click="$router.push(`/dashboard/product/addProduct`)"
                color="primary"
                class="ma-2"
                v-on="on"
              >
                <i class="material-icons mr-2">add_circle</i> Add New Product
              </v-btn>
            </template>
       
          </v-dialog>
       
        </v-toolbar>
        <v-row class="px-4">
          <v-col>
            <v-text-field
              outlined
              dense
              v-model="search"
              label="Search Here"
              prepend-inner-icon="search"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

   
      <template v-slot:item.image="{ item }">
        <img :src="imageUrl + item.image" width="60" />
      </template>
      <template v-slot:item.price="{ item }">
        <p>${{item.price}}</p>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">mdi-table-edit</v-icon>
        <v-icon
          v-if="isAdmin"
          @click="deleteItem(item)"
          >mdi-delete</v-icon
        >
      </template>


    </v-data-table>
  </section>
</template>
<script>
import AppProductImages from "../Product/AppProductImages";
import { VueEditor } from "vue2-editor";
import VImageInput from "vuetify-image-input";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    VImageInput,
    VueEditor,
    AppProductImages,
  },
  data: () => ({
    imageUrl: null,
    search:null,
    dialog:false,

    headers: [
      {
        text: "Image",
        align: "left",
        sortable: true,
        value: "image",
      },
      {
        text: "Product Title",
        align: "left",
        sortable: true,
        value: "name",
      },
      { text: "Price", value: "price" },
      { text: "Stock", value: "quantity" },

      { text: "Actions", value: "action", sortable: false },
    ],

    isAdmin: false,
    admin: null,
  }),

  computed: {
    ...mapGetters({
      getPresetList: "product/getPresetList",
    }),
  },

  mounted() {
    this.imageUrl = process.env.imageBaseURL
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
    }
  },

  created() {
    this.fetchPresetAction();
  },

  methods: {
    ...mapActions({
      fetchPresetAction: "product/productPreset",
    }),
  },
};
</script>
