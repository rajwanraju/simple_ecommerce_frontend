<template>
  <section>
    <v-navigation-drawer
      v-model="drawer"
       :expand-on-hover="mini"
      :mini-variant.sync="mini"
      permanent
      :clipped="clipped"
      app
      color="indigo darken-2"
      dark
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/lego/5.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item @click="$router.push(`/dashboard`)">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push(`/dashboard/product`)">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push(`/dashboard/order`)">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Orders </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

  



        <v-list-item
          @click="$router.push(`/dashboard/deliveried-orders`)"
        >
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Deliveried Orders </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

       
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="mini = !mini" />

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="$router.push(`/`)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <span>Go to Home</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <div class="dashboardContent">
        <nuxt-child />
      </div>
    </v-main>
    <v-footer :fixed="fixed" app>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>

      <span>&copy; 2021</span>
    </v-footer>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  middleware: "AdminGaurd",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [],

      isAdmin: false,
      admin: null,

      isVendor: false,
      vendor: null,
      mini: false,
      right: true,
      rightDrawer: false,
      title: "eStore",

    };
  },
  computed: {
    getPermissions() {
      if (this.isAdmin) {
        return this.admin.permissions;
      }
      if (this.isVendor) {
        return this.vendor.permissions;
      } else {
        return this.items;
      }
    },
    getUser() {
      if (this.isAdmin) {
        return this.admin;
      }
      if (this.isVendor) {
        return this.vendor;
      } else {
        return { name: "", email: "" };
      }
    },
  },
  mounted() {
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
    } 

    if (
      this.$vuetify.breakpoint.name == "sm" ||
      this.$vuetify.breakpoint.name == "xs"
    ) {
      this.mini = true;
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$cookies.set("isAdmin", false, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
      this.$router.replace({ path: "/" });
    },
  },
};
</script>
<style lang="scss" scoped>
.logoDiv {
  text-align: center;

  .logo {
    height: 5em;
  }
}
.dashboardContent {
  padding: 1em !important;
}
</style>
