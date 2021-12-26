<template>
  <header id="main-header">
    <section>
      <div class="container p-0 pl-4 pr-4 py-3">
        <section class="site-header">
          <div class="site-header--top pt-2 pb-1 row">
            <div
              class="
                col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3
                d-xs-flex d-sm-flex d-md-flex
                brand_class
              "
            >
              <div class="brand--logo">
                <v-app-bar-nav-icon
                  class="d-md-none"
                  @click.stop="drawerMenu = !drawerMenu"
                ></v-app-bar-nav-icon>

                <router-link to="/" class="logo">
                  <img src="/logo.png" alt="Estore" />
                </router-link>
              </div>
            </div>

            <div
              class="
                col-6 col-sm-8 col-md-9 col-lg-9 col-xl-9
                ml-auto
                d-xs-flex d-sm-flex d-md-flex
              "
            >
              <div class="site-header--action">
                <div
                  class="search-wrapper d-xs-none"
                  v-click-outside="hideSearchPanel"
                >
                  <div class="search-box">
                    <div class="search-box-border">
                      <input
                        v-model="searchByName"
                        class="product-search"
                        placeholder="Search products..."
                        v-on:input="callEvent"
                        v-on:focus="callEvent"
                        type="text"
                      />
                    </div>
                    <button class="search-button">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="search"
                        class="svg-inline--fa fa-search fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style="width: 1em"
                      >
                        <path
                          fill="currentColor"
                          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="search-result" v-if="showPreviewList">
                    <v-card class="search-card">
                      <button class="close-bt" @click="showPreviewList = false">
                        x
                      </button>
                      <v-tabs color="primary">
                        <v-tab>Products ({{ products.length }})</v-tab>

                        <v-tab-item class="search-window">
                          <v-list v-if="products.length > 0">
                            <v-list-item
                              class="item searchItem"
                              v-for="item in products"
                              :key="item._id"
                              @click="goToProduct(item.slug)"
                            >
                              <v-list-item-content>
                                <v-list-item-title
                                  class="search-title"
                                  v-text="item.name"
                                ></v-list-item-title>
                                <p class="caption price-caption">
                                  ৳ {{ item.price }}
                                </p>
                              </v-list-item-content>

                              <span class="font-weight-bold">
                                <v-icon>mdi-arrow-top-right</v-icon>
                              </span>
                            </v-list-item>
                          </v-list>
                          <div class="no-data" v-if="products.length === 0">
                            <p class="text-center">No products Found</p>
                          </div>
                        </v-tab-item>
                      </v-tabs>
                    </v-card>
                  </div>
                </div>
                <!-- CART BUTTON -->
                <div class="d-xs-flex d-sm-flex d-md-block">
                  <AppHeaderCartBtn />
                </div>
                <div
                  v-if="!isCustomer"
                  class="account-icon d-xs-flex d-sm-flex d-md-flex"
                  @click="openLoginModal"
                  v-tooltip="{
                    content: 'Login',
                    placement: 'bottom-center',
                    classes: ['success'],
                    targetClasses: ['it-has-a-tooltip'],
                    offset: 10,
                    delay: {
                      show: 100,
                      hide: 300,
                    },
                  }"
                >
                  <img
                    src="~assets/images/svg/login.svg"
                    alt="Dashboard icon"
                  />
                </div>
                <div
                  v-if="isCustomer"
                  class="account-icon d-xs-flex d-sm-flex d-md-flex"
                  @click="openDrawer"
                  v-click-outside="hideDrawer"
                >
                  <img
                    src="~assets/images/svg/login.svg"
                    alt="Dashboard icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="site-header--action pt-3" v-if="isMobile">
            <div class="search-wrapper" v-click-outside="hideSearchPanel">
              <div class="search-box">
                <div class="search-box-border">
                  <input
                    v-model="searchByName"
                    class="product-search"
                    placeholder="Search products..."
                    v-on:input="callEvent"
                    v-on:focus="callEvent"
                    type="text"
                  />
                </div>
                <button class="search-button">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    class="svg-inline--fa fa-search fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style="width: 1em"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    />
                  </svg>
                </button>
              </div>

              <div class="search-result" v-if="showPreviewList">
                <v-card class="search-card">
                  <button class="close-bt" @click="showPreviewList = false">
                    x
                  </button>
                  <v-tabs color="primary">
                    <v-tab>Products ({{ products.length }})</v-tab>

                    <v-tab-item class="search-window">
                      <v-list v-if="products.length > 0">
                        <v-list-item
                          class="item searchItem"
                          v-for="item in products"
                          :key="item._id"
                          @click="goToProduct(item.slug)"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              class="search-title"
                              v-text="item.name"
                            ></v-list-item-title>
                            <p class="caption price-caption">
                              ৳ {{ item.price }}
                            </p>
                          </v-list-item-content>

                          <span class="font-weight-bold">
                            <v-icon>mdi-arrow-top-right</v-icon>
                          </span>
                        </v-list-item>
                      </v-list>
                      <div class="no-data" v-if="products.length === 0">
                        <p class="text-center">No products Found</p>
                      </div>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div :class="[isMobile ? 'mobile-hide' : '']">
        <div class="site-header--bottom-wrapper">
          <div class="site-header--bottom">
            <div class="container" style="padding: 0px 12px">
              <div class="row no-gutters">
                <nav class="site-navigation-desk">
                  <ul class="main-menu">
                    <li>
                      <router-link to="/">Home</router-link>
                    </li>
                    <li>
                      <router-link to="/product">Products</router-link>
                    </li>
                    <li>
                      <router-link to="/about-us">About Us</router-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <v-row justify="center">
      <!-- login dialog  -->
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
              <v-alert
                v-if="successMessage"
                dense
                outlined
                text
                type="success"
                >{{ successMessage }}</v-alert
              >
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

              <div justify="center" class="pt-5 text-center">
                <p class="subtitle-1">
                  Don't have an account?
                  <span
                    class="primary--text"
                    style="cursor: pointer"
                    @click="signupDialog_open"
                    >Sign Up Now</span
                  >
                </p>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- register dialog  -->

      <v-dialog v-model="signupDialog" persistent max-width="400px">
        <v-card class="mx-auto" max-width="400" elevation="9">
          <v-toolbar color="sailor" dark>
            <v-toolbar-title class="text-capitalize"
              >REGISTRATION</v-toolbar-title
            >

            <v-btn icon @click="closeModal">
              <v-icon style="float: right">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid>
            <div>
              <v-alert v-if="errorMessage" dense outlined text type="error">{{
                errorMessage
              }}</v-alert>
              <v-alert
                v-if="successMessage"
                dense
                outlined
                text
                type="success"
                >{{ successMessage }}</v-alert
              >

              <v-form v-model="signupFormValidation">
                <v-text-field
                  label="Name"
                  append-icon="mdi-user"
                  prepend-inner-icon="mdi-account"
                  outlined
                  dense
                  color="primary"
                  v-model="signup.name"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  :rules="usernameRules"
                  prepend-inner-icon="mdi-email"
                  outlined
                  dense
                  color="primary"
                  v-model="signup.email"
                ></v-text-field>

                <v-text-field
                  v-model="signup.password"
                  :append-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-inner-icon="mdi-lock"
                  :rules="passwordRules"
                  name="input-10-1"
                  outlined
                  dense
                  label="Password"
                  hint="At least 6 characters"
                  :type="passwordVisibility ? 'text' : 'password'"
                  @click:append="passwordVisibility = !passwordVisibility"
                ></v-text-field>

                <!-- <p class="subtitle-1">Address</p> -->
                <v-text-field
                  label="Address"
                  append-icon="mdi-code"
                  prepend-inner-icon="mdi-home"
                  single-line
                  outlined
                  dense
                  color="primary"
                  v-model="signup.address"
                ></v-text-field>
              </v-form>

              <v-btn
                :disabled="!signupFormValidation"
                block
                x-large
                color="primary my-3"
                :loading="loginLoader"
                @click="userSignUp"
                >Sign Up</v-btn
              >

              <div justify="center" class="pt-5 text-center">
                <p class="subtitle-1">
                  Already have an account?
                  <span
                    class="primary--text"
                    style="cursor: pointer"
                    @click="signInDialog_open"
                    >Sign In</span
                  >
                </p>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Vertical navbar -->
    <div
      class="vertical-nav bg-white"
      id="sidebar"
      :class="drawer ? '' : 'active'"
      v-if="isCustomer"
    >
      <div class="side-inner py-3">
        <div class="nav-menu sidebar-item">
          <ul>
         
            <li>
              <a @click="$router.push('/user/order')">
                <v-icon>list_alt</v-icon>My Orders
              </a>
            </li>

            <li>
              <a @click="logoutUser">
                <v-icon>power_settings_new</v-icon>LOGOUT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawerMenu"
      absolute
      temporary
      height="100vh"
      width="256"
    >
      <v-list-item>
        <div class="brand--logo">
          <router-link to="/" class="logo">
            <img src="/logo.png" alt="Estore" />
          </router-link>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <div dense class="mobile-drawer">
        <v-tabs fixed-tabs>
          <v-tab>Menu</v-tab>
          <v-tab>Category</v-tab>

          <v-tab-item>
            <v-list>
              <v-list-item>
                <router-link to="/">
                  <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item-content>
                </router-link>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs>
      </div>

      <!-- <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template> -->
    </v-navigation-drawer>
  </header>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import Swal from "sweetalert2";
import ClickOutside from "vue-click-outside";
import VAvatarUploader from "vuetify-avatar-uploader";
import env from "@/assets/js/env";
import AppHeaderCartBtn from "@/components/LandingPage/AppCartHeaderBtn";
import MobileCart from "@/components/LandingPage/MobileCart";

export default {
  components: {
    AppHeaderCartBtn,
    MobileCart,
    VAvatarUploader,
  },
  data() {
    return {
      isMobile: false,
      menu: false,
      signupDialog: false,
      mobilemenu: false,
      message: false,
      hints: true,
      env: env,
      isCustomer: false,
      customer: null,
      drawer: false,
      drawerMenu: false,
      drawerCat: false,
      drawerwidth: 256,
      userType: false,
      signup: {
        name: null,
        email: null,
        phone: "",
        password: null,
        referral: null,
        address: null,
        otp: null,
      },

      timer: false,
      reSendOtpActive: false,
      newPasswordrequest: false,
      fotgetOtpSend: false,
      LoginTooltip: "Login",
      dialog: false,
      passwordDialog: false,
      fixed: false,
      searchByName: null,
      model: null,
      searchResults: [],
      previewList: [],
      products: [],
      category: [],
      shop: [],
      showPreviewList: false,
      searchLoader: false,
      searchDialog: false,
      otpVerify: false,
      otpVerifyConfirm: false,
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
    };
  },
  computed: {
    url() {
      return "https://randomuser.me/api/portraits/men/1.jpg";
    },

    loginModal() {
      if (this.$store.getters.getopenLoginModal) {
        this.openLoginModal();
      }
    },

    isValid() {
      return !this.phoneNumber && !this.valid;
    },
  },
  mounted() {
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
    }

    if (window.innerWidth <= 480) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    if (window.innerWidth > 768) {
      this.drawerwidth = 315;
    }
  },
  directives: {
    ClickOutside,
  },

  methods: {
    ...mapActions({
      customerSignIn: "authorization/customerSignIn",
    }),

    openDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
    hideDrawer() {
      this.drawer = false;
    },

    signupDialog_open() {
      this.signupDialog = true;
      this.dialog = false;
    },
    signInDialog_open() {
      this.signupDialog = false;
      this.dialog = true;
    },

    showPasswordDialog() {
      this.signupDialog = false;
      this.dialog = false;
      this.passwordDialog = true;
    },

    userSignUp() {
      /* Payload */
      const data = {
        name: this.signup.name,
        email: this.signup.email,
        address: this.signup.address,
        password: this.signup.password,
        c_password: this.signup.password,
      };

      /* API Request */
      let url = "/register";
      let payload = data;
      this.$axios
        .$post(url, payload)
        .then((res) => {
          self.successMessage = "Successfully Registered";

          this.signupDialog = false;
          setTimeout(() => {
            Swal.fire({
              position: "top-end",
              type: "success",
              title: "Registration Successfully Done.",
              showConfirmButton: false,
              timer: 2500,
            });

            self.successMessage = null;
          }, 2000);
        })
        .catch((err) => {
          this.errorMessage = "Please Enter Valid Credentials";
          setTimeout(() => {
            this.errorMessage = null;
          }, 10000);
        });
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
          this.drawer = true;
        })
        .catch((err) => {
          this.errorMessage = "Please Enter Valid Credentials";
          this.loginLoader = false;
        });
    },

    openLoginModal() {
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
      this.signupDialog = false;
      this.passwordDialog = false;
    },

    searchClicked() {
      this.$router.push("/find/" + this.searchByName);
    },
    goToProduct(id) {
      this.showPreviewList = false;
      this.searchDialog = false;
      this.$router.push("/product/" + id);
    },

    hideSearchPanel() {
      this.showPreviewList = false;
    },

    callEvent() {
      this.searchLoader = true;
      this.previewList = [];
      this.showPreviewList = false;
      fetch(
        this.$axios.defaults.baseURL+"search/" +
          this.searchByName
      )
        .then((res) => res.json())
        .then((res) => {
          this.searchLoader = false;
          this.products = res.data;
          this.showPreviewList = true;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    logoutUser() {
      localStorage.clear();
      this.isCustomer = false;
      this.$cookies.set("isCustomer", false, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      this.drawer = false;
      this.successMessage = "You Are Successfully Logout.";
      setTimeout(() => {
        this.successMessage = null;
        window.location.replace("/");
      }, 500);
    },
  },
  watch: {
    $route() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/header.scss";
</style>
