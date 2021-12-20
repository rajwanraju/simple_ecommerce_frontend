<template>
  <v-col cols="12" sm="3">
    <v-card class="mx-auto my-3">
      <div class="side-inner" v-if="customer">
        <div class="profile">
          <img
            src="https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg"
            alt="Image"
            class="img-fluid"
          />

          <h3 class="name">{{ customer.name }}</h3>
        </div>

        <div class="nav-menu sidebar-item">
          <v-tabs vertical>
            <v-tab
              @click="$router.push('/user/order')"
              :class="[currentPage === '/user/order' ? 'v-tab--active' : '']"
            >
              <v-icon>list_alt</v-icon>Order
            </v-tab>

            <v-tab @click="logoutUser">
              <v-icon>power_settings_new</v-icon>LOGOUT
            </v-tab>
          </v-tabs>
        </div>
      </div>

      <v-card-text> </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    isCustomer: false,
    customer: null,
    ctoken: null,
  }),
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
  mounted() {
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
      this.ctoken = localStorage.ctoken;
    }
  },

  methods: {
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
};
</script>
<style scoped>
.cartTitle {
  font-size: 1rem;
}

.side-inner {
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.side-inner .profile {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-bottom: 20px;
}
.side-inner .profile img {
  width: 80px;
  margin: 0 auto 20px auto;
  border-radius: 50%;
}
.side-inner .profile .name {
  font-size: 18px;
  margin-bottom: 0;
}
.side-inner .profile .country {
  font-size: 14px;
  color: #cfcfcf;
}
.side-inner .counter {
  padding-bottom: 20px;
  border-bottom: 1px solid #efefef;
  text-align: center;
}
.side-inner .counter div .number {
  display: block;
  font-size: 20px;
  color: #000;
}
.side-inner .counter div .number-label {
  color: #cfcfcf;
}
.side-inner .nav-menu ul,
.side-inner .nav-menu ul li {
  padding: 0;
  margin: 0px;
  list-style: none;
}
.side-inner .nav-menu ul li a:after {
  content: " \25B7";
  position: absolute;
  right: 20px;
  top: 14px;
}
.side-inner .nav-menu ul li a {
  display: block;
  padding: 10px 30px;
  color: #8b8b8b;
  position: relative;
  -webkit-transition: 0.3s padding-left ease;
  -o-transition: 0.3s padding-left ease;
  transition: 0.3s padding-left ease;
}
.side-inner .nav-menu ul li a:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0px;
  background-color: #ff7315;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.3s opacity ease, 0.3s visibility ease, 0.3s width ease;
  -o-transition: 0.3s opacity ease, 0.3s visibility ease, 0.3s width ease;
  transition: 0.3s opacity ease, 0.3s visibility ease, 0.3s width ease;
}
.side-inner .nav-menu ul li a:active,
.side-inner .nav-menu ul li a:focus,
.side-inner .nav-menu ul li a:hover {
  outline: none;
}
.side-inner .nav-menu ul li a:hover {
  background: #fcfcfc;
  color: #000;
}
.side-inner .nav-menu ul li a:hover:before {
  width: 4px;
  opacity: 1;
  visibility: visible;
}
.side-inner .nav-menu ul li.active a {
  background: #fcfcfc;
  color: #000;
}
.side-inner .nav-menu ul li.active a:before {
  opacity: 1;
  visibility: visible;
  width: 4px;
}
.report {
  min-height: 600px;
}
.text-bold {
  font-size: 12px;
  font-weight: 600;
}

.v-tab {
  justify-content: left;
}
</style>
