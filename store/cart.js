export const state = () => ({
  cartList: [],
  cartShow: false,
});

export const mutations = {
  setItemToCart(state, item) {
 

    state.cartList.push(item);
  },
  showCart(state, payload) {
    state.cartShow = payload;
  },
  incrementItemCount(state, itemIndex) {
    state.cartList[itemIndex].quantity++;
    state.cartList[itemIndex].totalPrice =
      state.cartList[itemIndex].quantity * state.cartList[itemIndex].price;
  },
  decreaseItemCount(state, itemIndex) {
    if (state.cartList[itemIndex].quantity > 1) {
      state.cartList[itemIndex].quantity--;
      state.cartList[itemIndex].totalPrice =
        state.cartList[itemIndex].quantity * state.cartList[itemIndex].price;
    }
  },
  removeItem(state, index) {
    if (index > -1) {
      state.cartList.splice(index, 1);
    }
  },
  clearCart(state) {
    state.cartList = [];
  },
};

export const actions = {
  addItemToCart(context, item) {
    let itemIndex = context.state.cartList.findIndex((element) => {
      return element.id == item.id;
    });


    if (itemIndex > -1) {
      
      context.commit("incrementItemCount", itemIndex);
      context.dispatch(
        "snackbar/successMessage",
        `${item.name} Updated Into Cart`,
        { root: true }
      );
    } else {
      context.commit("setItemToCart", item);
      context.dispatch(
        "snackbar/successMessage",
        `${item.name} Added Into Cart`,
        { root: true }
      );
    }
  },
  removeFromCart(context, item) {
    let itemIndex = context.state.cartList.findIndex((element) => {
      return element.id == item.id;
    });
    context.commit("removeItem", itemIndex);
    context.dispatch(
      "snackbar/errorMessage",
      `${item.name} Removed From Cart`,
      { root: true }
    );
  },
  increaseItem(context, item) {
    let index = context.state.cartList.findIndex((element) => {
      return element.id == item.id;
    });
    context.commit("incrementItemCount", index);
  },
  decreaseItem(context, item) {
    let index = context.state.cartList.findIndex((element) => {
      return element.id == item.id;
    });
    context.commit("decreaseItemCount", index);
  },
  clearCart(context) {
    context.commit("clearCart");
  },
  showCart(context, payload) {
    context.commit("showCart", payload);
  },
};
export const getters = {
  getCartList(state) {
    return state.cartList;
  },
  getshowCart(state, payload) {
    state.cartShow = payload;
    return state.cartShow;
  },
  getCartCount(state) {
    return state.cartList.length;
  },
  getTotalBillAmount(state) {
    return state.cartList
      .map((item) => item.totalPrice)
      .reduce((prev, curr) => prev + curr, 0);
  },
  getCartListForOrder(state) {
    return state.cartList.map((item) => {
      const data = {
        _id: item.id,
        size: "Free Size",
        quantity: item.quantity,
      };
      return data;
    });
  },
};
