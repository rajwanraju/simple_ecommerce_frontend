//state
export const state = () => ({
  item: null,
  itemList: [],
  presetList: [],
});

// getters
export const getters = {
  getItemList: state => {
    return state.itemList;
  },
  getPresetList: state => {
    return state.presetList;
  },
  getCreatedItem: state => {
    return state.item;
  }
};

//mutations
export const mutations = {
  create(state, payload) {
    state.itemList.splice(0, 0, payload);
    state.successRequestFlag = true;
    state.item = payload;
  },

  remove(state, payload) {
    state.itemList.splice(payload.index, 1);
  },
  update(state, payload) {
    // console.log(payload.index);
    state.itemList.splice(payload.index, 1, payload.data);
    state.successRequestFlag = true;
  },
  updateImages(state, payload) {
    // console.log(payload.index);
    state.itemList[payload.index].images = payload.data;
  },
  fetch(state, payload) {
    state.itemList = payload;
  },
 
  fetchPreset(state, payload) {
    state.presetList = payload;
  },
  
};

//Actions
export const actions = {
  async productPreset(context, id) {
    try {
      let url = `/products`;

      this.$axios.setToken(localStorage.getItem("token"));

      await this.$axios.$get(url).then(res => {
        context.commit("fetchPreset", res.data);
        //calling Snackbar
        context.dispatch(
          "snackbar/successMessage",
          `All Product Preset Fetched`,
          { root: true }
        );
      });
    } catch (error) {
      if (error) {
        context.dispatch("snackbar/errorMessage", error.message, {
          root: true
        });
      }
    }
  },


  async addNewItem(context, item) {
    try {
      let url = "product/create";

      this.$axios.setToken(localStorage.getItem("token"));

      await this.$axios.$post(url, item).then(res => {
        context.commit("create", res.data);
        //calling Snackbar
        context.dispatch("snackbar/successMessage", res.message, {
          root: true
        });

        return new Promise((resolve, reject) => {
          resolve(res.data);
        });
      });
    } catch (error) {
      if (error) {
        context.commit("presetSuccessRequestFlag");
        context.dispatch("snackbar/errorMessage", error.message, {
          root: true
        });
      }
    }
  },
  async updateItem(context, item) {
    try {
      let url = "product/update";

      this.$axios.setToken(localStorage.getItem("token"));

      await this.$axios.$post(url, item).then(res => {
        let itemIndex = context.state.itemList.findIndex(element => {
          return element._id == item._id;
        });
        context.commit("update", { index: itemIndex, data: res.data });
        //calling Snackbar
        context.dispatch("snackbar/successMessage", `${res.message}`, {
          root: true
        });
      });
    } catch (error) {
      if (error) {
        context.dispatch("snackbar/errorMessage", error.message, {
          root: true
        });
      }
    }
  },
  async removeItem(context, item) {
    try {
      let url = `product/delete/${item._id}`;

      this.$axios.setToken(localStorage.getItem("token"));

      let itemIndex = context.state.itemList.findIndex(element => {
        return element._id == item._id;
      });

      await this.$axios.$get(url).then(res => {
        context.commit("remove", { index: itemIndex });
        //calling Snackbar
        context.dispatch("snackbar/successMessage", `Product Deleted`, {
          root: true
        });
      });
    } catch (error) {
      if (error) {
        context.dispatch("snackbar/errorMessage", error.message, {
          root: true
        });
      }
    }
  },
  updateProductImage(context, item) {
    let itemIndex = context.state.itemList.findIndex(element => {
      return element._id == item._id;
    });
    context.commit("updateImages", { index: itemIndex, data: item.images });
  }
};
