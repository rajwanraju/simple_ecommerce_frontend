<template>
  <section>
    <v-row align="center" style="height:80vh;">
      <v-col sm="6" md="6"  offset-sm="3" offset-md="3">
        <v-card class="loginCard pa-5">
          <v-row align="center">
            <v-col class="logoDiv">
             <img src="/logo.png">
            </v-col>
            <v-col>
              <div class="px-10">
                <v-alert v-if="errorMessage" dense outlined text type="error">{{errorMessage}}</v-alert>
                <v-alert v-if="successMessage" dense outlined text type="success">{{successMessage}}</v-alert>
                <p class="font-weight-medium">Login For System Use</p>
                <v-form v-model="loginFormValidation">
                  <v-text-field
                    label="Email"
                    :rules="usernameRules"
                    append-icon="email"
                    solo-inverted
                    color="primary"
                    depressed
                    v-model="username"
                    dense
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    solo-inverted
                    :rules="passwordRules"
                    dense
                    v-model="password"
                    :append-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passwordVisibility ? 'text' : 'password'"
                    @click:append="passwordVisibility = !passwordVisibility"
                  ></v-text-field>
                </v-form>
                <v-btn
                  :disabled="!loginFormValidation"
                  block
                  color="primary my-3"
                  :loading="loginLoader"
                  @click="login"
                >Login</v-btn>
                <!-- <p class="caption">
                  <nuxt-link to="/forgetPassword">Reset Password ?</nuxt-link>
                </p> -->
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {

  data: () => ({
    username: "",
    password: "",

    /*Login Form Validation*/
    loginFormValidation: false,
    usernameRules: [
      v => !!v || "Name is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [v => !!v || "Password is required"],
    errorMessage: null,
    successMessage: null,

    passwordVisibility: false,
    loginLoader: false,

    /*Local Storage Data*/
    isAdmin: null,
    admin: null
  }),
  mounted() {
    if (localStorage.isCustomer) {
      this.isAdmin = localStorage.isCustomer;
      this.admin = localStorage.customer;
      this.$router.replace({ path: "/dashboard" });
    }
  },
  computed: {},

  methods: {
    login() {
      /* Validation MSG & Loader */
      this.errorMessage = null;
      this.successMessage = null;
      this.loginLoader = true;

      /* Payload */
      const data = {
        email: this.username,
        password: this.password
      };

      /* API Request */
      let url = "/login";
      let payload = data;
      this.$axios
        .$post(url, payload)
        .then(res => {
          console.log(res);
          this.successMessage = res.message;
          this.loginLoader = false;

          /* Set Data IN LocalStorage */
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isAdmin", true);
          localStorage.setItem("admin", JSON.stringify(res.data));
          this.$cookies.set("isAdmin", true, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
          this.$router.replace({ path: "/dashboard" });
        })
        .catch(err => {
          this.errorMessage = "Please Enter Valid Credentials";
          this.loginLoader = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.loginCard {
  box-shadow: 0px 5px 5px rgba(165, 167, 185, 0.05),
    0px 5px 30px rgba(165, 167, 185, 0.25) !important;
  border-radius: 15px !important;
  text-align: center;
}
</style>

