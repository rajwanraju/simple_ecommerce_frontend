<template>
  <main class="wrapper">
    <section class="report">
      <v-container>
        <v-row no-gutters>
          <Sidebar />
          <v-col cols="12" sm="9">
            <v-card class="mx-auto my-3">
              <v-card-text>
                <h4>My Orders</h4>

                <AppNoDataCard
                  v-if="orderList.length === 0"
                  text="Sorry ! You dont have any Recent Order."
                />
                <v-expansion-panels class="mt-5" v-if="orderList.length > 0">
                  <v-expansion-panel v-for="(item, i) in orderList" :key="i">
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                        <v-row no-gutters align="center">
                          <!-- {{item}} -->
                          <v-col cols="6" md="2">
                            <v-chip
                              v-if="item.status == 'Pending'"
                              class="ma-2"
                              color="primary"
                              text-color="white"
                              >Pending</v-chip
                            >
                            <v-chip
                              v-if="item.status == 'Processing'"
                              class="ma-2"
                              color="warning"
                              text-color="white"
                              >Confirm</v-chip
                            >
                            <v-chip
                              v-if="item.status == 'Shipped'"
                              class="ma-2"
                              color="info"
                              text-color="white"
                              >Sent for delivery</v-chip
                            >
                            <v-chip
                              v-if="item.status == 'Deliveried'"
                              class="ma-2"
                              color="green"
                              text-color="white"
                              >Delivered</v-chip
                            >
                            <v-chip
                              v-if="item.status == 4"
                              class="ma-2"
                              color="error"
                              text-color="white"
                              >Returned</v-chip
                            >
                            <v-chip
                              v-if="item.status == 'Cancel'"
                              class="ma-2"
                              color="error"
                              text-color="white"
                              >Cancelled</v-chip
                            >
                          </v-col>
                          <v-col cols="6" md="3"
                            >Order No: {{ item.order_id }}</v-col
                          >
                          <v-col cols="6" md="2"
                            >Total:৳ {{ priceFormate(item.grand_total) }}
                          </v-col>
                          <v-col cols="6" md="2">
                            {{
                              moment(item.createdAt).format("MMM Do YYYY")
                            }}</v-col
                          >
                          <v-col cols="6" md="3" class="text--secondary">
                            <v-fade-transition leave-absolute>
                              <div v-if="open" key="0"></div>
                              <span v-else key="1"></span>
                            </v-fade-transition>
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col md="8" sm="8" cols="12">
                          <v-card class="pa-5">
                            <p class="caption">Order Info</p>
                            <p>
                              Grand Total
                              <v-chip class="mx-5">
                                ৳{{ priceFormate(item.grand_total) }}</v-chip
                              >
                            </p>
                            <v-simple-table dense>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Quantity</th>
                                    <th class="text-left">Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="item in item.products"
                                    :key="item._id"
                                  >
                                    <td>
                                      {{ item.name }}
                                    </td>
                                    <td>{{ item.quantity }}</td>
                                    <td>৳ {{ priceFormate(item.price) }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-card>
                        </v-col>
                        <v-col md="4" sm="4" cols="12">
                          <div v-if="item.orderHistory.length > 0 && item.status !='Pending'"> 
                               <p>
                            Order History
                          </p>
                          <v-simple-table dense>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Date</th>
                                  <th class="text-left">Edit At</th>
                                  <th class="text-left">Edit BY</th>
                                  <th class="text-left">Edit value</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(orderhistory ,index) in item.orderHistory" :key="index">
                                  <td>{{
                              moment(orderhistory.createdAt).format("MMM Do YYYY")
                            }}</td>
                                  <td>{{orderhistory.edit_at}}</td>
                                  <td>{{orderhistory.edit_by}}</td>
                                  <td>{{orderhistory.edit_value}}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>

                          </div>
                          <div v-else>

                               <v-row>
                      <v-col md="6" cols="12">
                        <a
                          href="#"
                          target="blank"
                        >
                          <v-btn color="primary" large block
                            >Edit Order</v-btn
                          >
                        </a>
                      </v-col>
                    
                    </v-row>
                       
                          </div>
                        </v-col>
                      </v-row>
                      <v-divider inset></v-divider>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
<style lang="scss" scoped></style>
<script>
import moment from "moment";
import { mapMutations, mapActions, mapGetters, mapstatus } from "vuex";
import AppNoDataCard from "../../components/Base/AppNoDataCard";
import Sidebar from "@/components/Customer/DashboardSidebar";
export default {
  layout: "landingpage",
  components: {
    Sidebar,
    AppNoDataCard,
  },
  data: () => ({
    moment: moment,
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
    type: "",
    isCustomer: false,
    customer: null,
    ctoken: null,
    dialog: false,
    ammount: "",
    attachment: null,
    imageUrl: null,
    accountNumber: "",
    bank: "",
    orderId: null,
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

    priceFormate(price) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        Math.floor(price)
      );
    },
  },
};
</script>
