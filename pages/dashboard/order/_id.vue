<template>
  <section>
    <v-container v-show="orderInfo">
      <br />

      <div class="backBtn" @click="$router.go(-1)">
        <span class="line tLine"></span>
        <span class="line mLine"></span>
        <span class="label">Go Back</span>
        <span class="line bLine"></span>
      </div>

      <br />
      <br />
      <v-row>
        <v-col md="5">
          <v-select
            @change="updateOrderStatus()"
            :items="itemsOs"
            v-model="orderInfo.state"
            label="Order Status"
            dense
            outlined
            :disabled="orderInfo.state == 3 || orderInfo.state == 4"
          ></v-select>
        </v-col>
        <v-col md="5">
          <v-select
            @change="updatePaymentStatus()"
            :items="itemsPs"
            v-model="orderInfo.paymentStatus"
            label="Payment Status"
            dense
            outlined
          ></v-select>
        </v-col>

        <v-col md="2">
          <v-btn class="text-right" color="success" @click="updateOrder()"
            >Save</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col md="4">
          <v-card class="pa-5 fill-height" outlined>
            <p class="caption">Customer Info</p>
            <template v-if="orderInfo.customer">
              <p class="caption ma-0">
                Name :
                <b>{{ orderInfo.customer.name }}</b>
              </p>
              <p class="caption ma-0">
                Address : {{ orderInfo.customer.address }}
              </p>

              <div class="overline mt-3">
                <v-text-field
                  outlined
                  dense
                  v-model="orderInfo.customer.deliveryAddress"
                  label="Delivery Address :"
                  readonly
                ></v-text-field>
              </div>
            </template>
            <p class="overline ma-0">Phone : {{ orderInfo.phone }}</p>
          </v-card>
        </v-col>
        <v-col md="8">
          <v-card class="pa-5" outlined>
            <p class="caption">Order Info</p>
            <h5 class="py-2">
              Date : {{ moment(orderInfo.createdAt).format("MMM Do YYYY") }}
            </h5>
            <a :href="imageUrl + orderInfo.invoice" target="_black">
              <v-btn color="primary"> <v-icon>list</v-icon>View Invoice </v-btn>
            </a>

            <v-row justify="center">
              <v-dialog v-model="orderEditPanel" max-width="290">
                <v-card>
                  <v-card-title class="headline">Order Edit</v-card-title>
                  {{ orderInfo }}
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn color="green darken-1" text @click="dialog = false"
                      >Confirm</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Vendor</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="orderInfo in orderInfo.products"
                    :key="orderInfo._id"
                  >
                    <td>{{ orderInfo.vendor.name }}</td>
                    <td>{{ orderInfo.name + " " + orderInfo.size }}</td>
                    <td>{{ orderInfo.quantity }}</td>
                    <td class="text-right">
                      <p class="overline ma-0">
                        ৳ {{ priceFormate(orderInfo.price) }}
                      </p>
                      <p class="caption ma-0">
                        Discount - ৳ {{ priceFormate(orderInfo.discount) }} BDT
                      </p>
                      <p class="caption ma-0">Vat + {{ orderInfo.vat }} BDT</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">Billing Amount</td>
                    <td class="text-right">
                      ৳ {{ priceFormate(orderInfo.totalBill) }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>

      <v-divider inset></v-divider>
      <v-row v-if="orderInfo.payment">
        <v-col md="12" cols="12">
          <v-card class="pa-5" outlined>
            <p class="caption">Order Payment</p>

            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Date</th>
                    <th class="text-left">Amount</th>
                    <th class="text-left">Bank</th>
                    <th class="text-left">Receipt</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="orderPayment in orderInfo.payment"
                    :key="orderPayment._id"
                  >
                    <td>
                      {{ moment(orderPayment.createdAt).format("MMM Do YYYY") }}
                    </td>
                    <td>৳ {{ priceFormate(orderPayment.amount) }}</td>
                    <td>{{ orderPayment.bank }}</td>
                    <td>
                      <v-img
                        :src="imageUrl + orderPayment.attachment"
                        alt="Deposit Receipt"
                        width="240px"
                      ></v-img>
                    </td>
                    <td>
                      <div class="p-2">
                        <v-chip
                          color="warning"
                          v-if="orderPayment.status == 0"
                          label
                          >Pending</v-chip
                        >

                        <v-chip
                          color="success"
                          v-if="orderPayment.status == 1"
                          label
                          >Accepted</v-chip
                        >

                        <v-chip
                          color="danger"
                          v-if="orderPayment.status == 2"
                          label
                          >Cancel</v-chip
                        >
                      </div>
                    </td>
                    <td v-if="orderPayment.status != 1">
                      <v-icon
                        class="mr-2"
                        @click="paymentAccept(orderInfo.payment[0])"
                        >mdi-table-edit</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="confirmDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >Confirm Order Status Panel</v-card-title
        >

        <v-card-text
          >Are You Sure You Want to Change the Order Status ?</v-card-text
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelOrderStatusUpdate">Cancel</v-btn>
          <v-btn color="primary" text @click="confirmOrderStatusUpdate"
            >I accept</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="paymentConfirmDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >Confirm Payment Status Panel</v-card-title
        >

        <v-card-text
          >Are You Sure You Want to Change the Payment Status ?</v-card-text
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelPaymentStatusUpdate">Cancel</v-btn>
          <v-btn color="primary" text @click="confirmPaymentStatusUpdate"
            >I accept</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="paymentDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Payment Confirm
        </v-card-title>

        <v-card-text>
          A Request for confirmation about payment. Are you sure to process it?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="paymentDialog = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="confirmPayment">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    dates: [],
    imageUrl: "https://api.sailorsexpress.com/",

    orderEditPanel: false,

    /*Order Status Update*/
    confirmDialog: false,
    confiremed: false,
    orderStatusUpdatedItem: null,

    /*Payment Status Update*/
    paymentConfirmDialog: false,
    paymentConfiremed: false,
    paymentStatusUpdatedItem: null,

    getOrderState: false,
    onlineOrderList: [],
    orderDetails: {
      state: null,
      paymentStatus: null,
    },
    payload: {
      startDate: null,
      endDate: null,
      search: null,
    },

    search: "",
    headers: [
      {
        text: "Order ID",
        align: "start",
        filterable: false,
        value: "orderId",
      },
      { text: "Date", value: "createdAt" },
      { text: "Customer", value: "customer.name" },
      { text: "Phone", value: "phone" },
      { text: "Amount", value: "totalBill" },
      { text: "Discount", value: "discount" },
      { text: "Order Due", value: "orderDue" },
      { text: "Status", value: "state" },
      { text: "Action", value: "action" },
    ],

    itemsOs: [
      { text: "pending", value: 0 },
      { text: "processing", value: 1 },
      { text: "sent for delivery", value: 2 },
      { text: "delivered", value: 3 },
      { text: "returned ", value: 4 },
      { text: "cancelled", value: 6 },
    ],
    itemsPs: [
      { text: "pending", value: 0 },
      { text: "paid", value: 1 },
      { text: "refund", value: 2 },
      { text: "cancelled", value: 3 },
    ],
  }),
  created() {},
  mounted() {
    this.imageUrl = process.env.base_image_url;
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
      this.ctoken = localStorage.token;
    }
  },
  computed: {
    orderInfo() {
      return this.$store.getters.getOrderDetails;
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
    updateOrder() {
      console.log(this.orderInfo);
      let payload = {
        deliveryAddress: this.orderInfo.customer.deliveryAddress,
      };
      let url = "/order/update/" + this.orderInfo._id;
      this.$axios.setToken(localStorage.getItem("token"));
      this.$axios
        .$post(url, payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          // this.errorMessage(err);
        });
    },
    editOrder(i) {
      this.clearCart();
      // this.orderEditPanel = true;

      this.orderInfo.products.forEach((element) => {
        console.log(element);
        const data = {
          id: element._id,
          name: element.name,
          price: element.price,
          discount: element.discount,
          vat: element.vat,
          quantity: element.quantity,
          size: element.size,
        };
        this.addToCart(data);
      });
      //  this.$router.push('/');
      this.$router.push({
        path: "/dashboard/createOrder",
        query: { id: this.orderInfo._id },
      });
      // const orderInfo = {
      //   id: res.data._id,
      //   name: res.data.name,
      //   price: res.data.price,
      //   discount: this.getDiscountedAmount(res.data.price, res.data.discount),
      //   vat: res.data.vat,
      //   quantity: 1,
      //   size: res.data.size
      // };
      // console.log(orderInfo);
      // this.addToCart(orderInfo);

      console.log(this.orderInfo);
      console.log(i);
    },
    getFilteredOrders() {
      this.payload.startDate = this.dates[0];
      this.payload.endDate = this.dates[1];

      let url = "/order/view/byDate";
      this.$axios.setToken(this.ctoken);
      this.$axios
        .$post(url, this.payload)
        .then((res) => {
          console.log(res);
          this.onlineOrderList = res.data;
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
    updateOrderStatus() {
      this.confirmDialog = true;
      this.orderStatusUpdatedItem = this.orderInfo;
    },
    callUpdateOrderStatusApi() {
      const url =
        "/order/update/" +
        this.orderInfo._id +
        "/state/" +
        this.orderInfo.state;
      this.$axios.setToken(localStorage.getItem("token"));
      this.$axios.$get(url).then((res) => {
        if (res.success) {
          this.successMessage("Order Status Updated");
          // this.getOrderState=false;
        }
      });
    },

    /*After Clicking Payment Confirm Call the Api */
    confirmPaymentStatusUpdate() {
      this.paymentConfirmDialog = false;
      this.paymentConfiremed = true;
      this.callUpdatePaymentStatusApi(this.paymentStatusUpdatedItem);
    },
    cancelPaymentStatusUpdate() {
      this.paymentConfirmDialog = false;
      this.initialize();
    },
    /*After Changing the Payment DROPDOWN get the value and Store it for api call */
    updatePaymentStatus() {
      this.paymentConfirmDialog = true;
      this.paymentStatusUpdatedItem = this.orderInfo;
    },
    callUpdatePaymentStatusApi() {
      const url =
        "/order/update/" +
        this.orderInfo._id +
        "/payment/" +
        this.orderInfo.paymentStatus;
      this.$axios.setToken(localStorage.getItem("token"));
      this.$axios.$get(url).then((res) => {
        if (res.success) {
          this.successMessage("Payment Status Updated");
        }
      });
    },

    paymentAccept() {
      this.paymentItem = this.orderInfo;

      this.paymentDialog = true;
    },

    confirmPayment() {
      this.$axios.setToken(this.ctoken);
      let url = "/admin/approve/payment/" + this.paymentItem._id;
      this.$axios
        .$get(url)
        .then((res) => {
          this.successMessage("Payment Proceed!");

          this.paymentItem = null;

          setTimeout(() => {
            // this.$router.app.refresh()
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          this.errorMessage = err.message;
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
div.backBtn {
  width: 100px;
  left: 300px;
  top: 100px;
  background-color: #f4f4f4;
  transition: all 0.4s ease;
  position: fixed;
  cursor: pointer;
}

span.line {
  bottom: auto;
  right: auto;
  top: auto;
  left: auto;
  background-color: #333;
  border-radius: 10px;
  width: 100%;
  left: 0px;
  height: 2px;
  display: block;
  position: absolute;
  transition: width 0.2s ease 0.1s, left 0.2s ease, transform 0.2s ease 0.3s,
    background-color 0.2s ease;
}

span.tLine {
  top: 0px;
}

span.mLine {
  top: 13px;
  opacity: 0;
}

span.bLine {
  top: 26px;
}

.label {
  position: absolute;
  left: 0px;
  top: 5px;
  width: 100%;
  text-align: center;
  transition: all 0.4s ease;
  font-size: 1em;
}

div.backBtn:hover span.label {
  left: 25px;
}

div.backBtn:hover span.line {
  left: -10px;
  height: 5px;
  background-color: #f76060;
}

div.backBtn:hover span.tLine {
  width: 25px;
  transform: rotate(-45deg);
  left: -15px;
  top: 6px;
}

div.backBtn:hover span.mLine {
  opacity: 1;
  width: 30px;
}

div.backBtn:hover span.bLine {
  width: 25px;
  transform: rotate(45deg);
  left: -15px;
  top: 20px;
}
</style>
