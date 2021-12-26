<template>
  <main class="wrapper">
    <section class="report">
      <v-container>
        <v-row no-gutters>
          <Sidebar />
          <v-col cols="12" sm="9">
            <v-card>
                  <v-container>
        <v-row align="center">
          <v-col cols="3" offset="6">
            <v-select
              v-model="select"
              :items="items"
              item-text="state"
              item-value="abbr"
              label="Short Products"
              persistent-hint
              return-object
              single-line
              @change="orderShorting()"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="orderList"
                :search="search"
                :items-per-page="10"
                class="elevation-1"
                :footer-props="{
                  showFirstLastPage: true,
                  firstIcon: 'mdi-arrow-collapse-left',
                  lastIcon: 'mdi-arrow-collapse-right',
                  prevIcon: 'mdi-minus',
                  nextIcon: 'mdi-plus',
                }"
              >
                <template v-slot:item.order_id="{ item }">
                  <a @click="orderDetails(item)" class="order-link">
                    {{ item.order_id }}
                  </a>
                </template>

                <template v-slot:item.name="{ item }">
                  {{ item.name }}
                </template>

                <template v-slot:item.created_at="{ item }">
                  {{ moment(item.created_at).format("DD MMM YYYY") }}
                </template>

                <template v-slot:item.grand_total="{ item }">
                  ৳{{ priceFormate(item.grand_total) }}
                </template>
                <template v-slot:item.action="{ item }" >
                  <a @click="orderEditAction(item)" target="blank" v-if="item.status == 'Pending'">
                    <v-btn color="primary" small>Edit Order</v-btn>
                  </a>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="editModal" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5"> Edit Order Details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col md="12">
                  <v-text-field
                    outlined
                    v-model="editOrder.name"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field
                    outlined
                    v-model="editOrder.phone"
                    label="Phone Number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col md="12">
                  <v-textarea
                    outlined
                    v-model="editOrder.address"
                    label="Shipping Address"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editModal = false">
              Close
            </v-btn>
            <v-btn  color="green darken-1" @click="OrderUpdateAction()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>
  </main>
</template>
<script>
import moment from "moment";
import { mapMutations, mapActions, mapGetters, mapstatus } from "vuex";
import AppNoDataCard from "@/components/Base/AppNoDataCard";
import Sidebar from "@/components/Customer/DashboardSidebar";
import Swal from "sweetalert2";
export default {
  layout: "landingpage",
  components: {
    Sidebar,
    AppNoDataCard,
  },
  data: () => ({
    moment: moment,
    editOrder: {
      name: null,
      phone: null,
      address: null,
    },
    search: "",
    orderSearch: "",
    editModal: false,
    headers: [
      {
        text: "Order ID",
        align: "start",
        filterable: true,
        value: "order_id",
      },
      { text: "Date", value: "created_at" },
      { text: "Customer", value: "name" },
      { text: "Amount", value: "grand_total" },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" },
    ],
    orderList: [],
    shortData: null,
    short: [
      { text: "All Orders" },
      { text: "Pending" },
      { text: "Confirmed" },
      { text: "Send For Delivery" },
      { text: "Deliveried" },
      { text: "Canceled" },
      { text: "Returned" },
    ],
      select: { state: "All Orders", abbr: "all" },
      items: [
        { state: "All Orders", abbr: "all" },
        { state: "Pending", abbr: "pending" },
        { state: "Confirm", abbr: "confirm" },
        { state: "Deliveried", abbr: "deliveried" },
        { state: "Cancel", abbr: "cancel" },
      ],
    type: "",
    isCustomer: false,
    customer: null,
    ctoken: null,
    dialog: false,
  }),
  mounted() {
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
      this.ctoken = localStorage.token;
      this.initialize();
    }
    this.imageUrl = process.env.base_image_url;
  },

  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
    }),
    initialize() {
      const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };
      let url = "/customer/orders";
      this.$axios.$get(url, config).then((res) => {
        this.orderList = res.data;
      });
    },

    orderDetails(item) {
      this.$store.commit("SetOrderDetails", item);
      this.$router.push("/user/order/" + item.order_id);
    },

    orderEditAction(item) {
      this.editOrder.orderId = item.order_id;
      this.editOrder.name = item.name;
      this.editOrder.phone = item.phone;
      this.editOrder.address = item.address;

      this.editModal = true;
    },

    OrderUpdateAction() {

        var self = this;
 const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };

       let data = {
        name: this.editOrder.name,
        address: this.editOrder.address,
        phone: this.editOrder.phone,
      };

      const url = "/orders/"+this.editOrder.orderId;
      const payload = data;
 
      this.$axios
        .$put(url, payload, config)
        .then((res) => {
          if (res.success) {
            Swal.fire({
              title: "Succesfully Update Your Order!",
              type: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok!",
            }).then((result) => {
              setTimeout(() => {
                   self.editModal = false;
                    this.initialize()
              }, 500);
            });
          self.editModal = false;
          }
        })
        .catch((err) => {
        

          this.errorMessage = err.response.data.message;
        });


    },

    orderShorting(){

 
        

    },
    priceFormate(price) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        Math.floor(price)
      );
    },
  },
};
</script>
<style scoped>
.order-link {
  color: #ff1493;
  font-size: 14px;
  font-weight: 600;
}
.order-link:hover {
  color: #000;
}
</style>
