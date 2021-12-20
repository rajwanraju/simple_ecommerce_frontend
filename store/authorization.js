import Cookies from 'js-cookie'


export const state = () => ({
  user: null,
  token: null,
  isAdmin: false,
  isVendor: false,


  ctoken: null,
  isCustomer: false,
  customer: null,
  // token: Cookies.get('token')
})

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null,
  isAdmin: state => state.isAdmin,
  isLoggedIn: state => state.token ? true : false,
 
  isCustomer: state => state.isCustomer,
  getCustomerInfo: state => state.customer
}



export const mutations = {
  set_user(state, payload) {
    state.user = payload;
  },
  set_token(state, payload) {
    state.token = payload;
  },
  set_customerInfo(state, payload) {

    console.log(payload);
    state.customer = payload;
    state.ctoken = payload.token;
    state.isCustomer = true;

    
  },
  logout_customer(state) {
    state.customer = null;
    state.isCustomer = null;
    state.ctoken = null;
  },
  logout_user(state) {
    state.user = null;
    state.token = null;
    state.isAdmin = null;
  },
  set_admin(state) {
    state.isAdmin = true;
  },
  set_vendor(state) {
    state.isVendor = true;
  },

}


export const actions = {

  /* Action Sign in As A ADMIN */
  async SignInAsAdmin(context, item) {
    try {
      await this.$axios.$post(`admin/signin`, item).then((res) => {
        if (res.success) {

          // Calling Mutation
          context.commit('set_user', res.data);
          context.commit('set_token', res.data.token);
          context.commit('set_admin');
          localStorage.setItem('token', res.data.token);
        
          //calling Snackbar
          context.dispatch('snackbar/successMessage', `Login Succesfully`, { root: true });

          this.$router.replace({ path: 'dashboard' });

        }
      });

    } catch (error) {
      if (error) {
        context.dispatch('snackbar/errorMessage', error.message, { root: true });
      }
    }
  },
  /* Action Sign in As A VENDOR */
  async SignInAsVendor(context, item) {
    try {
      await this.$axios.$post(`admin/signin`, item).then((res) => {
        if (res.success) {
          console.log(res.data);
          localStorage.setItem('vtoken', res.data.token);
          localStorage.setItem('isVendor', true);
          context.commit('set_vendor');
          context.commit('set_user', res.data);
          // localStorage.setItem('vendor', data.name);

          //calling Snackbar
          context.dispatch('snackbar/successMessage', `Login Succesfully`, { root: true });

          this.$router.replace({ path: 'dashboard' });

        }
      });

    } catch (error) {
      if (error) {
        context.dispatch('snackbar/errorMessage', error.message, { root: true });
      }
    }
  },
  Logout(context) {

    context.commit('logout_user');
    localStorage.clear();
    this.$router.replace({ path: '/' });
  },
  async updateAdminPassword(context, item) {
    try {

      let url = `/admin/password/update`;

      this.$axios.setToken(localStorage.getItem('token'));
      await this.$axios.$post(url, item).then((res) => {
        context.dispatch('snackbar/successMessage', `${res.message} `, { root: true });
      });

    } catch (error) {
      if (error) {
        context.dispatch('snackbar/errorMessage', error.message, { root: true });
      }
    }
  },
  async SignInAsCustomer(context, data) {

    
    context.commit('set_customerInfo', data);
    localStorage.setItem('ctoken', data.token);
    localStorage.setItem('isCustomer', true);
    localStorage.setItem('customer',  JSON.stringify(data));
    console.log(data);
    this.$router.replace({ path: '/' });


  },

  customerSignIn(context, data) {

    
    context.commit('set_customerInfo', data);
    localStorage.setItem('ctoken', data.token);
    localStorage.setItem('isCustomer', true);
    localStorage.setItem('customer',  JSON.stringify(data));
    console.log(data);


  },

  AutoSignIn(context, data) {
    context.commit('set_customerInfo', data);
    localStorage.setItem('ctoken', data.token);
    localStorage.setItem('isCustomer', true);
    localStorage.setItem('customer', data.name);
    this.$router.replace({ path: '/' });
  },


}