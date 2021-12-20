<template>
  <section>
    <div class="container p-12 mx-auto">
      <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
        <div class="flex flex-col md:w-full">
          <h2 class="mb-4 font-bold md:text-xl text-heading ">
            Shipping Address
          </h2>
          <form class="justify-center w-full mx-auto" method="post" action>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  v-model="name"
                  :error-messages="nameErrors"
                  label="Name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  outlined
                  v-model="phone"
                  label="Phone Number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              outlined
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-textarea
              outlined
              v-model="address"
              label="Shipping Address"
              required
            ></v-textarea>
            <v-btn
              :disabled="valid"
              color="success"
              class="mr-4"
              @click="placedOrder"
            >
              Place Order
            </v-btn>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
  },

  components: {},
  data() {
    return {
      valid: false,
      orderLoading: false,
      agentData: [],
      orderConfirmed: false,
      errorMessage: null,
      isCustomer: false,
      customer: null,
      name: null,
      email: null,
      phone: null,
      address: null,
      note: null,
      disabled: 0,
      selectedPhone: null,
    };
  },
  mounted() {
    if (localStorage.customer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
      this.email = this.customer.email;
      this.name = this.customer.name;
      this.ctoken = localStorage.token;
    }
  },

  computed: {
    ...mapGetters({
      getCartItems: "cart/getCartList",
      getTotalBillAmount: "cart/getTotalBillAmount",
      getCartListForOrder: "cart/getCartListForOrder",
    }),

    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");

      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");

      return errors;
    },
  },
  methods: {
    ...mapActions({
      clearCart: "cart/clearCart",
    }),

    placedOrder() {
      this.$v.$touch();
      this.orderLoading = true;
      let data = {
        products: this.getCartItems,
        subTotal: this.getTotalBillAmount,
        email: this.email,
        name: this.name,
        address: this.address,
        phone: this.phone,
      };

      const url = "/orders";
      const payload = data;
      const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };

      this.$axios
        .$post(url, payload, config)
        .then((res) => {
          if (res.success) {
            Swal.fire({
              title: "Succesfully Placed Your Order!",
              type: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok!",
            }).then((result) => {
              setTimeout(() => {
                this.$router.push({ path: "/" });
              }, 500);
            });
            this.clearCart();
          }
        })
        .catch((err) => {
          this.orderLoading = false;

          this.errorMessage = err.response.data.message;
        });
    },
  },
};
</script>
