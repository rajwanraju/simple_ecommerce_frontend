<template>
  <section>
    <v-card>
      <v-container>
        <h4 class="text-center pt-10 pb-10">Order List</h4>
        <v-card>
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
            :items="onlineOrderList"
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
            <template v-slot:item.orderId="{ item }">
              <a @click="orderDetails(item)" class="order-link">
                {{ item.order_id }}
              </a>
            </template>

            <template v-slot:item.name="{ item }">
              {{ item.name }}
              <br />
              <span>{{ item.phone }}</span>
              <br />
              <span>{{ item.address }}</span>
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ moment(item.created_at).format("DD MMM YYYY") }}
            </template>

            <template v-slot:item.grand_total="{ item }">
              ৳{{ priceFormate(item.grand_total) }}
            </template>

            <template v-slot:item.status="{ item }">
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
                >Processing</v-chip
              >
              <v-chip
                v-if="item.status == 'Shipped'"
                class="ma-2"
                color="info"
                text-color="white"
                >Sent for Delivery</v-chip
              >
              <v-chip
                v-if="item.status == 'Deliveried'"
                class="ma-2"
                color="green"
                text-color="white"
                >Delivered</v-chip
              >
              <v-chip
                v-if="item.status == 'Cancel'"
                class="ma-2"
                color="error"
                text-color="white"
                >Cancelled</v-chip
              >
            </template>

            <template v-slot:item.action="{ item }">
              <v-select
                @change="updateOrderStatus(item)"
                :items="itemsOs"
                v-model="item.status"
                label="Order Status"
                dense
                outlined
                :disabled="
                  item.status == 'Cancel' || item.status == 'Deliveried'
                "
              ></v-select>

              <v-dialog v-model="confirmDialog" persistent width="500">
                <v-card>
                  <v-card-title class="headline grey lighten-2"
                    >Confirm Order Status Panel</v-card-title
                  >

                  <v-card-text
                    >Are You Sure You Want to Change the Order Status
                    ?</v-card-text
                  >

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="cancelOrderStatusUpdate"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="primary"
                      text
                      @click="confirmOrderStatusUpdate"
                      >I accept</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-card>
  </section>
</template>

<script>
import env from "../../../assets/js/env";
import moment from "moment";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  //   props: ["orderList"],
  data: () => ({
    moment: moment,
    env: env,
    paymentDialog: false,
    datepicker: false,
    filtePanel: false,
    dates: [],

    /*Order Status Update*/
    confirmDialog: false,
    confiremed: false,
    orderStatusUpdatedItem: null,

    getOrderState: false,
    onlineOrderList: [],
    item: {
      state: null,
      paymentStatus: null,
    },
    payload: {
      startDate: null,
      endDate: null,
      search: null,
    },

    search: "",
    orderSearch: "",
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

    itemsOs: [
      { text: "Pending", value: "Pending" },
      { text: "Processing", value: "Processing" },
      { text: "Sent for delivery", value: "Shipped" },
      { text: "Delivered", value: "Delivered" },
      { text: "Cancelled", value: "Cancelled" },
    ],
  }),
  created() {},
  mounted() {
    this.imageUrl = process.env.base_image_url;
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
      this.ctoken = localStorage.token;
      this.initialize();
    }
  },
  computed: {
    dateRangeText() {
      if (this.dates.length > 0) {
        return this.dates.join(" ~ ");
      } else {
        return "Select Date Range";
      }
    },
  },
  watch: {
    name: function(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
    }),
    filteredOrders() {
      if (this.filtePanel) {
        this.filtePanel = false;
      } else {
        this.filtePanel = true;
      }
    },
    orderDetails(item) {
      this.$store.commit("SetOrderDetails", item);
      this.$router.push("/dashboard/order/" + item.order_id);
    },

    initialize() {
      let url = "/orders";
      this.$axios.setToken(this.ctoken);
      const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };
      this.$axios
        .get(url, config)
        .then((res) => {
          this.onlineOrderList = res.data.data;
        })
        .catch((err) => {
          // this.errorMessage(err);
        });
    },

    /*After Clicking Confirm Call the Api */
    confirmOrderStatusUpdate() {
      this.confirmDialog = false;
      this.confiremed = true;
      this.callUpdateOrderStatusApi(this.orderStatusUpdatedItem);
    },
    cancelOrderStatusUpdate() {
      this.confirmDialog = false;
      this.initialize();
    },
    /*After Changing the DROPDOWN get the value and Store it for api call */
    updateOrderStatus(item) {
      this.confirmDialog = true;
      this.orderStatusUpdatedItem = item;
    },
    callUpdateOrderStatusApi(item) {
      const url = "/order/" + item.order_id + "/status/" + item.status;
      this.$axios.setToken(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };
      this.$axios.$get(url, config).then((res) => {
        if (res.success) {
          this.successMessage("Order Status Updated");
        }
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

<style scoped>
.order-link {
  color: darkcyan;
  font-size: 14px;
  font-weight: 600;
}
.order-link:hover {
  color: #000;
}
</style>
