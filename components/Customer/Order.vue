<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <h4>My Orders</h4>
        </v-col>
        <v-col cols="12" md="4" offset-md="6">
          <v-overflow-btn
            class="my-2"
            :items="short"
            label="Shorting Orders"
            item-value="text"
            v-model="shortData"
            @change="shortOrder"
          ></v-overflow-btn>
        </v-col>
      </v-row>

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
                    v-if="item.state == 0"
                    class="ma-2"
                    color="primary"
                    text-color="white"
                    >Pending</v-chip
                  >
                  <v-chip
                    v-if="item.state == 1"
                    class="ma-2"
                    color="warning"
                    text-color="white"
                    >Processing</v-chip
                  >
                  <v-chip
                    v-if="item.state == 2"
                    class="ma-2"
                    color="info"
                    text-color="white"
                    >Sent for delivery</v-chip
                  >
                  <v-chip
                    v-if="item.state == 3"
                    class="ma-2"
                    color="green"
                    text-color="white"
                    >Delivered</v-chip
                  >
                  <v-chip
                    v-if="item.state == 4"
                    class="ma-2"
                    color="error"
                    text-color="white"
                    >Returned</v-chip
                  >
                  <v-chip
                    v-if="item.state == 5"
                    class="ma-2"
                    color="green"
                    text-color="white"
                    >Confirmed</v-chip
                  >
                  <v-chip
                    v-if="item.state == 6"
                    class="ma-2"
                    color="error"
                    text-color="white"
                    >Cancelled</v-chip
                  >
                </v-col>
                <v-col cols="6" md="3">Order No: {{ item.orderId }}</v-col>
                <v-col cols="6" md="2"
                  >Total:৳ {{ priceFormate(item.totalBill) }}
                </v-col>

                <v-col cols="6" md="3">
                  {{ moment(item.createdAt).format("MMM Do YYYY") }}</v-col
                >
                <v-col cols="6" md="2" class="text--secondary">
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
              <v-col md="6" cols="12">
                <v-card class="pa-5" outlined>
                  <p class="caption">Order Info</p>
                  <p class="overline">
                    Bill Amount
                    <v-chip class="mx-5">
                      ৳{{ priceFormate(item.totalBill) }}</v-chip
                    >
                  </p>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Quantity</th>
                          <th class="text-left">Price</th>
                          <th class="text-left">Discount</th>
                          <th class="text-left">Vat</th>
                          <th class="text-left">Due</th>
                          <th class="text-left">monthlyEmi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in item.products" :key="item._id">
                          <td>
                            {{ product.name }}
                            <p class="caption">{{ product.size }}</p>
                          </td>
                          <td>{{ product.quantity }}</td>
                          <td>৳ {{ priceFormate(product.price) }}</td>
                          <td>৳ {{ priceFormate(product.discount) }}</td>
                          <td>{{ product.vat }}</td>
                          <td>৳ {{ item.orderDue }}</td>
                          <td>৳ {{ item.monthlyEmi }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
              <v-col md="6" cols="12">
                <v-card class="pa-5" outlined>
                  <p>
                    <span class="caption">Customer Name :</span>
                    {{ item.customer.name }}
                  </p>
                  <p>
                    <span class="caption">Customer Phone :</span>
                    {{ item.phone }}
                  </p>
                  <p>
                    <span class="caption">Delivery Address :</span>
                    {{ item.customer.deliveryAddress }}
                  </p>
                  <v-row>
                    <v-col md="6" cols="12">
                      <a
                        :href="`https://api.sailorsexpress.com/${item.invoice}`"
                        target="blank"
                      >
                        <v-btn color="primary" large block>View Invoice</v-btn>
                      </a>
                    </v-col>
                    <v-col md="6" cols="12" v-if="!item.payment">
                      <v-btn color="success" large dark @click="payment(item)">
                        Pay
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-divider inset></v-divider>
            <v-row v-if="item.payment">
              <v-col md="6" cols="12">
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="orderPayment in item.payment"
                          :key="orderPayment._id"
                        >
                          <td>
                            {{
                              moment(orderPayment.createdAt).format(
                                "MMM Do YYYY"
                              )
                            }}
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
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Order Payment</span>
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Amount*"
                required
                v-model="ammount"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Bank Name"
                hint="Enter Bank Name"
                required
                v-model="bank"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Account Number*"
                v-model="accountNumber"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- <v-file-input
            label="Upload Image"
            v-model="attachment"
            outlined
            dense
            @change=uploadProfile
            append-icon="mdi-camera"
          ></v-file-input> -->

              <input type="file" @change="uploadProfile" />
            </v-col>
          </v-row>

          <small>*indicates required field</small>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="cancelOrderPayment">Cancel</v-btn>
            <v-btn color="success" dark @click="order_payment"> Pay </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import moment from "moment";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import AppNoDataCard from "../../components/Base/AppNoDataCard";
export default {
  layout: "landingpage",
  components: {
    AppNoDataCard,
  },
  middleware: "e-agent",
  data: () => ({
    moment: moment,
    orderList: [],
    shortList: [],
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
      this.ctoken = localStorage.ctoken;
      this.initialize();
    }
    this.imageUrl = process.env.base_image_url;
  },
  created() {
    this.fetchAllSettings();
  },

  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
      fetchAllSettings: "landingpage/fetchItems",
    }),
    initialize() {
      this.$axios.setToken(this.ctoken);
      let url = "order/view/customer/" + this.customer._id;
      this.$axios.$get(url).then((res) => {
        this.orderList = res.data;
        this.shortList = res.data;
      });
    },
        shortOrder() {
      if (this.shortData == "Send For Delivery") {
        let orders = this.shortList;
        let myOrder = [];
         orders.forEach(order => {

            if(order.state == 2){
              myOrder.push(order);
            }
            
          });
        this.orderList = myOrder;
      }

      if (this.shortData == "Confirmed") {
        let orders = this.shortList;
        let myOrder = [];
          orders.forEach(order => {

            if(order.state == 1){
              myOrder.push(order);
            }
            
          });
        this.orderList = myOrder;
      } else if (this.shortData == "Pending") {
        let orders = this.shortList;
        let myOrder = [];
        
          orders.forEach(order => {

            if(order.state == 0){
              myOrder.push(order);
            }
            
          });
          
        
        this.orderList = myOrder;
      } else if (this.shortData == "Canceled") {
        let orders = this.shortList;
        let myOrder = [];
          orders.forEach(order => {

            if(order.state == 6){
              myOrder.push(order);
            }
            
          });
        this.orderList = myOrder;
      } else if (this.shortData == "Deliveried") {
        let orders = this.shortList;
        let myOrder = [];
          orders.forEach(order => {

            if(order.state == 3){
              myOrder.push(order);
            }
            
          });
        this.orderList = myOrder;
      }
       else if (this.shortData == "Returned") {
        let orders = this.shortList;
        let myOrder = [];
         orders.forEach(order => {

            if(order.state == 4){
              myOrder.push(order);
            }
            
          });
        this.orderList = myOrder;
      } else {
        this.orderList = this.shortList;
      }
    },

    uploadNewImage() {
      if (this.imageMore) {
        this.showImage = URL.createObjectURL(this.imageMore);
        console.log(this.showImage);
      }
    },

    payment(item) {
      this.$store.commit("setOrderPayment", item);
      this.$router.push(`/payment/` + item._id);
    },

    paymentModal(order) {
      this.dialog = true;
      this.orderId = order._id;
    },

    uploadProfile(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.attachment = reader.result;
      };
    },
    order_payment() {
      let data = {
        ammount: this.ammount,
        attachment: this.attachment,
        accountNumber: this.accountNumber,
        bank: this.bank,
        type: "order",
        agentId: this.customer._id,
        orderId: this.orderId,
      };

      const url = "/agent/bank/payment";
      const payload = data;

      this.$axios.setToken(localStorage.getItem("token"));
      this.$axios.$post(url, payload).then((res) => {
        if (res.success) {
          this.dialog = false;

          this.successMessage("Payment Receipt Successfully Send!");
        }
      });
    },
    priceFormate(price) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        Math.floor(price)
      );
    },
    cancelOrderPayment() {
      this.dialog = false;
    },
  },
};
</script>
