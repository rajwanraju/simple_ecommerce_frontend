export const state = () => ({
  openLoginModal: false,
    cartShow: true,
    paymentOrder:null,
    orderDetails:null
  })
  
  export const mutations = {
    showCart(state, payload) {
        state.cartShow = payload;
      },
      setOrderPayment(state,payload){
        state.paymentOrder = payload
      },
      setopenLoginModal(state,payload){
        state.openLoginModal = payload
      },
      SetOrderDetails(state,payload){
        state.orderDetails = payload;
    }


  }
  export const getters = {
    getshowCart(state) {
        return state.cartShow;
      },
      getopenLoginModal(state) {
        return state.openLoginModal;
      },

      getOrderPayment(state){
        return state.paymentOrder
      },
      getOrderDetails: state => {
        return state.orderDetails;
    }
  }