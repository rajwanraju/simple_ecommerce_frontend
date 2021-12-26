<template>
  <main class="wrapper">
    <section class="report">
      <v-container>
        <v-row no-gutters>
          <Sidebar />
          <v-col cols="12" sm="9">
            <v-container v-if="orderInfo">
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
                <v-col md="4">
                  <v-card class="pa-5 fill-height" outlined>
                    <p class="caption">Customer Info</p>
                    <template >
                      <p class="caption ma-0">
                        Name :
                        <b>{{ orderInfo.name }}</b>
                      </p>
                      <p class="caption ma-0">
                        Address : {{ orderInfo.address }}
                      </p>
                    </template>
                    <p class="overline ma-0">Phone : {{ orderInfo.phone }}</p>
                  </v-card>
                </v-col>
                <v-col md="8">
                  <v-card class="pa-5" outlined>
                    <p class="caption">Order Info</p>
                    <h5 class="py-2">
                      Date :
                      {{ moment(orderInfo.createdAt).format("MMM Do YYYY") }}
                    </h5>
                    <p>
                      Grand Total
                      <v-chip class="mx-5">
                        ৳{{ priceFormate(orderInfo.grand_total) }}</v-chip
                      >
                    </p>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Unit Price</th>
                            <th class="text-left">Sub Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in orderInfo.products" :key="item.id">
                            <td>
                              {{ item.name }}
                            </td>
                            <td>{{ item.quantity }}</td>
                            <td>৳ {{ priceFormate(item.price) }}</td>
                            <td>
                              ৳ {{ priceFormate(item.price * item.quantity) }}
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-col>
              </v-row>
              <br />
              <br />
              <v-row v-if="orderInfo.orderHistory.length > 0">
                <v-col md="12">
                  <v-card class="pa-5 fill-height" outlined>
                    <div>
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
                            <tr
                              v-for="(orderhistory,
                              index) in orderInfo.orderHistory"
                              :key="index"
                            >
                              <td>
                                {{
                                  moment(orderhistory.createdAt).format(
                                    "MMM Do YYYY"
                                  )
                                }}
                              </td>
                              <td>{{ orderhistory.edit_at }}</td>
                              <td>{{ orderhistory.edit_by }}</td>
                              <td>{{ orderhistory.edit_value }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
<script>
import env from "../../../assets/js/env";
import Sidebar from "@/components/Customer/DashboardSidebar";
import moment from "moment";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  layout: "landingpage",
  components: {
    Sidebar,
  },
  data: () => ({
    moment: moment,
    imageUrl: null,
    orderInfo: null,
    isCustomer: false,
    customer: null,
    ctoken: null,
  }),
  created() {

  },
  mounted() {
      
    this.imageUrl = process.env.base_image_url;
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
      this.ctoken = localStorage.token;
        this.orderDetails();
    }

  },

  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
    }),

    orderDetails() {
      const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };
      let url = "/orders/" + this.$route.params.id;
      this.$axios.$get(url, config).then((res) => {
        this.orderInfo = res.data;
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
  left: 30%;
  top: 190px;
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
