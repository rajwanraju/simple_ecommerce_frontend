<template>
  <section>
    <div class="cart-icon-wrap" @click="OpenCart">
      <img src="~assets/images/svg/cart.svg" alt />
      <span class="cart-add">{{ getCartCount }}</span>
    </div>
    
    <!-- Vertical navbar -->
    <div class="vertical-nav bg-white" id="sidebar" :class="getshowCart ? 'active' : ''">
      <div class="bg-light">
        <div class="profile-sidebar">

          <AppCartTable />

          <div class="box" v-if="getCartItems.length > 0">
              <hr />
            <div role="group">
              <div role="group" class="btn-group special" style="width:100%">
                <button type="button" class="btn btn-lg">Total</button>
                <button type="button" class="btn btn-lg">৳{{ priceFormate(getTotal) }}</button>
              </div>

              <br />
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-btn block color="primary" @click="confirm">Proceed To Checkout</v-btn>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppCartTable from "../LandingPage/AppCartTable";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    AppCartTable,
  },
  data: () => ({
    cartView: false,
    totalAmount: 0,
     isCustomer: false,
      customer: null,

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


       if(this.isCustomer && this.customer.role == 'agent'){
          var totalAmount = 0;


      this.getCartItems.map((item) => {

        totalAmount += parseInt(item.price) * parseInt(item.quantity);
      });

      return totalAmount;

       }
       else{
           var totalAmount = 0;

 
      this.getCartItems.map((item) => {
        totalAmount += parseInt(item.price - item.discount) * parseInt(item.quantity);
      });

      return totalAmount;
       }

     

    },

    getFinalBill() {
      if (this.promoDiscount) {
        return this.getTotalBillAmount - this.promoDiscount.discount;
      } else {
        return this.getTotalBillAmount;
      }
    },
  },
  methods: {
    confirm() {
      this.$router.push("/cart");
      this.cartView = false;
    },

    checkout() {
      this.cartView = false;
      this.router.push("/cart");
    },

    OpenCart() {

      console.log(1);

        this.$store.commit("showCart", false);
    },
    closeCart() {
      this.$store.commit("showCart",true );
    },

       priceFormate(price){
      return new Intl.NumberFormat( { maximumSignificantDigits: 3 }).format(price);


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
  border: 1px solid #363f4d;
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
    background: #008187;
    border-radius: 100%;
    color: #fff;
    cursor: pointer;
  }
}

.vertical-nav {
  min-width: 30rem;
  width: 30rem;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
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

  .cart-icon-wrap {
    font-size: 16px;
    color: #363f4d;
    display: inline-block;
    margin-right: 18px;
    min-width: 42px;
    height: 42px;
    border: 1px solid #363f4d;
    line-height: 42px;
    text-align: center;
    border-radius: 100%;
    position: relative;
    margin-left: 28px;
    cursor: pointer;
    background: #ffffff;
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