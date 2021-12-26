<template>
  <section>
    <div class="cart-icon-wrap" @click="OpenCart">
      <v-icon
        v-tooltip="{
          content: 'Cart',
          placement: 'bottom-center',
          classes: ['success'],
          targetClasses: ['it-has-a-tooltip'],
          offset: 25,
          delay: {
            show: 100,
            hide: 300,
          },
        }"
      >
        mdi-cart
      </v-icon>
      <span class="cart-add">{{ getCartCount }}</span>
    </div>

    <!-- Vertical navbar -->
    <div
      class="vertical-nav bg-white"
      id="sidebar"
      :class="getshowCart ? 'active' : ''"
    >
      <div class="bg-light">
        <div class="profile-sidebar">
          <AppCartTable />

          <div class="box" v-if="getCartItems.length > 0">
            <hr />

            <div role="group">
              <v-row no-gutters style="height: 40px">
                <v-col>
                  <p class="font-weight-bold">Total</p>
                </v-col>
                <v-col>
                  <p class="font-weight-bold">৳{{ priceFormate(getTotal) }}</p>
                </v-col>
              </v-row>

              <v-btn block color="primary" @click="confirm"
                >Proceed To Checkout</v-btn
              >
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card class="mx-auto" max-width="400" elevation="9">
        <v-toolbar color="sailor" dark>
          <v-toolbar-title class="text-capitalize">LOGIN</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn icon @click="closeModal">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <div>
            <v-alert v-if="errorMessage" dense outlined text type="error">{{
              errorMessage
            }}</v-alert>
            <v-alert v-if="successMessage" dense outlined text type="success">{{
              successMessage
            }}</v-alert>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-form v-model="loginFormValidation">
              <p class="subtitle-3">Email/Mobile</p>
              <v-spacer></v-spacer>

              <v-text-field
                label="Email/Mobile"
                :rules="usernameRules"
                append-icon="mdi-cellphone"
                prepend-inner-icon="mdi-cellphone"
                outlined
                dense
                color="primary"
                v-model="username"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <span class="subtitle-3">Password</span>

              <v-text-field
                :append-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-inner-icon="mdi-lock"
                :rules="passwordRules"
                outlined
                dense
                label="Password"
                hint="At least 6 characters"
                :type="passwordVisibility ? 'text' : 'password'"
                @click:append="passwordVisibility = !passwordVisibility"
                color="primary"
                v-model="password"
              ></v-text-field>
            </v-form>
            <v-spacer></v-spacer>

            <v-spacer></v-spacer>
            <v-btn
              :disabled="!loginFormValidation"
              block
              x-large
              full-width
              color="primary my-3"
              :loading="loginLoader"
              @click="login"
              >Login</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import AppCartTable from "../LandingPage/AppCartTable";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import ClickOutside from "vue-click-outside";
import Swal from "sweetalert2";
export default {
  components: {
    AppCartTable,
  },
  directives: {
    ClickOutside,
  },
  data: () => ({
    cartView: false,
    dialog: false,
    totalAmount: 0,
    isCustomer: false,
    customer: null,
    phoneNumberRules: [
      (v) => !!v || "Phone nulber is required",
      (v) =>
        (v && new RegExp(/^(?:\+88|01)?(?:\d{11}|\d{13})$/).test(v)) ||
        "Give a valid phone number",
    ],
    phoneNumber: null,
    username: "",
    password: "",

    /*Login Form Validation*/
    loginFormValidation: false,
    signupFormValidation: false,
    usernameRules: [(v) => !!v || "Email Or Phone is required"],
    passwordRules: [(v) => !!v || "Password is required"],
    errorMessage: null,
    successMessage: null,

    passwordVisibility: false,
    loginLoader: false,
  }),

  mounted() {
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
    }
  },
  computed: {
    ...mapGetters({
      getCartCount: "cart/getCartCount",
      getCartItems: "cart/getCartList",
      getTotalBillAmount: "cart/getTotalBillAmount",
    }),
    getshowCart() {
      return this.$store.getters.getshowCart;
    },

    getTotal() {
      var totalAmount = 0;

      this.getCartItems.map((item) => {
        totalAmount += parseInt(item.price) * parseInt(item.quantity);
      });

      return totalAmount;
    },
  },
  methods: {
    confirm() {
      var em = this;
      if (localStorage.isCustomer) {
        this.$router.push("/cart");
        this.cartView = false;
      } else {
        this.$store.commit("showCart", true);

        Swal.fire({
          type: "error",
          title: "Please Login First!",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login Now!",
        }).then((result) => {
          console.log(result);
          if (result.value) {
            em.dialog = true;
          }
        });
      }
    },

    login() {
      /* Validation MSG & Loader */
      this.errorMessage = null;
      this.successMessage = null;
      this.loginLoader = true;
      const data = {
        email: this.username,
        password: this.password,
      };

      /* API Request */
      let url = "/login";
      let payload = data;
      this.$axios
        .$post(url, payload)
        .then((res) => {
          console.log(res);
          this.successMessage = res.message;
          this.loginLoader = false;

          /* Set Data IN LocalStorage */
          localStorage.clear();
          localStorage.setItem("token", res.data.token);

          this.dialog = false;

          localStorage.setItem("isCustomer", true);
          localStorage.setItem("customer", JSON.stringify(res.data.user));
          this.$cookies.set("isCustomer", true, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });

          this.isCustomer = true;
          this.customer = JSON.parse(localStorage.customer);
        })
        .catch((err) => {
          this.errorMessage = "Please Enter Valid Credentials";
          this.loginLoader = false;
        });
    },
    OpenCart() {
      this.$store.commit("showCart", false);
    },
    closeCart() {
      this.$store.commit("showCart", true);
    },

    closeModal() {
      this.dialog = false;
    },

    priceFormate(price) {
      return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        price
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.cart-icon-wrap {
  font-size: 16px;
  color: #363f4d;
  display: inline-block;
  margin-right: 18px;
  min-width: 42px;
  height: 42px;
  border: 1px solid #ff1493;
  line-height: 42px;
  text-align: center;
  border-radius: 100%;
  position: relative;
  margin-left: 40px;
  cursor: pointer;
  background: #ffffff;
  img {
    width: 14px;
  }

  .cart-add {
    position: absolute;
    top: -6px;
    right: -14px;
    font-size: 14px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    background: #ff1493;
    border-radius: 100%;
    color: #fff;
    cursor: pointer;
  }
}

.vertical-nav {
  min-width: 25rem;
  width: 25rem;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
  background: #fff;
}

.page-content {
  width: calc(100% - 30rem);
  margin-left: 30rem;
  transition: all 0.4s;
}

/* for toggle behavior */

#sidebar.active {
  margin-right: -30rem;
}

#content.active {
  width: 100%;
  margin: 0;
}

@media (max-width: 768px) {
  #sidebar.active {
    margin-right: -30rem;
  }
  #content {
    width: 100%;
    margin: 0;
  }
  #content.active {
    margin-right: 30rem;
    width: calc(100% - 30rem);
  }
}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 20px 0;
  background: #fff;
  // border-bottom: 1px solid #000;
}

.profile-userpic img {
  float: none;
  margin: 0 auto;
  width: 80px;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}

#sidebar ul li {
  padding: 5px 0px;
  border-bottom: 1px solid #000;
}
</style>
